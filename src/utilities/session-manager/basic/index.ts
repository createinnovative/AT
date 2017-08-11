/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as expressSession from "express-session";

import * as interfaces from "../../../interfaces";
import * as eventManagerInterfaces from "../../../interfaces/setup-config/event-manager";
import * as storageManagerInterfaces from "../../../interfaces/utilities/storage-manager";
import * as sessionManagerInterfaces from "../../../interfaces/utilities/session-manager";
import * as sharedLogicInterfaces from "../../../interfaces/utilities/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicSessionManager implements interfaces.utilities.SessionManager {

  middleware: express.RequestHandler[] = [];

  private readonly emitter: sessionManagerInterfaces.Emitter;
  private readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  private readonly getUserById: storageManagerInterfaces.core.user.GetById;
  private readonly production: boolean;

  /*****************************************************************/

  constructor( params: sessionManagerInterfaces.Params ) {
    this.emitter = params.emitter;
    this.checkThrow = params.checkThrow;
    this.getUserById = params.getUserById;
    let attemptSession = function ( req: express.Request, res: express.Response, next: express.NextFunction ) {
      if ( req.session ) {
        return next();
      }
      let tryCount = 1;
      let maxTries = 3;

      function lookupSession ( error: any ) {
        if ( error ) {
          throw error;
        }
        if ( req.session ) {
          return next();
        }
        tryCount += 1;
        if ( tryCount > maxTries ) {
          throw new Error( "Session: Couldn't retain session" );
        }
        params.middlewareConfiguration( req, res, lookupSession );
      }

      lookupSession( "" );
    }
    this.middleware.push( attemptSession );
  }

  /*****************************************************************/

  readonly setCurrentUser = ( user: interfaces.dataModel.core.user.Super, req: express.Request, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {
        req.session.userId = user.id;
        new Promise<void>(( resolve, reject ) => {
          this.emitter.setCurrentUser( {
            user: user,
            req: req
          } );
          resolve();
        } );
        return Promise.resolve( user );
      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.setCurrentUserFailed( {
            user: user,
            req: req,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "SetCurrentUserFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly signOut = ( req: express.Request, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<any>(( resolve, reject ) => {
          req.session.destroy(( err: any ) => {
            if ( err ) {
              reject( err );
            } else {
              resolve();
            }
          } );
        } );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.signOutFailed( {
            req: req,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "SignOutFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  readonly getCurrentUser = ( req: express.Request, forceThrow = false ): Promise<interfaces.dataModel.core.user.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        if ( req.session.userId ) {
          
          return this.getUserById( req.session.userId );
          
        } else {

          new Promise<void>(( resolve, reject ) => {
            this.emitter.noCurrentUser( {
              req: req
            } );
            resolve();
          } );

          return Promise.reject( {
            identifier: "NoCurrentUser",
            data: {}
          } );

        }

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getCurrentUserFailed( {
            req: req,
            reason: reason
          } );
          resolve();
        } );

        if ( reason && reason.identifier === "NoCurrentUser" ) {
          return Promise.reject( {
            identifier: "NoCurrentUser",
            data: {
              reason: reason
            }
          } );
        }

        return Promise.reject( {
          identifier: "GetCurrentUserFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

export default ( params: {
  emitEvent: eventManagerInterfaces.Emit;
  production: boolean;
  getUserById: storageManagerInterfaces.core.user.GetById;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): interfaces.utilities.SessionManager => {

  let middlewareConfiguration: express.RequestHandler = expressSession( {
    name: "AllThings263",
    secret: "secregrandt",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: ( params.production ) ? true : false,
      httpOnly: true
    }
  } );

  return new BasicSessionManager( {
    emitter: emitterFactory( params.emitEvent ),
    production: params.production,
    getUserById: params.getUserById,
    middlewareConfiguration: middlewareConfiguration,
    checkThrow: params.checkThrow
  } );

}

/******************************************************************************/

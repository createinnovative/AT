/******************************************************************************/

import { expect, assert } from "chai";
let logger = require( "tracer" ).colorConsole();
import * as sinon from "sinon";
import * as Promise from "bluebird";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageUserFactory from "../../../../../src/utilities/storage-manager/mongodb/user/index";
<<<<<<< HEAD
import aFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";
=======
import dataStructuresFactory from "../../../../../src/utilities/shared-logic/basic/data-structures/index";
>>>>>>> workarea

import * as interfaces from "../../../../../src/interfaces/index";
import { UserModel } from "../../../../../src/utilities/storage-manager/mongodb/user/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

/******************************************************************************/

describe( "User GET", function (): void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox: sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy: sinon.SinonSpy;
  let testInstances: UserModel[] = [];

  let dataStructures: interfaces.utilities.sharedLogic.DataStructures;
  let storageUser: interfaces.utilities.storageManager.StorageUser;

  /************************************************************/

  before(( done ) => {

    prep(( testUsers: UserModel[] ) => {

      testUsers.forEach(( user: UserModel ) => {
        testInstances.push( user );
      } );

      dataStructures = dataStructuresFactory( sandbox.spy() );

      done();

    } );

    dataStructures = dataStructuresFactory( sandbox.spy() );

  } );

  /************************************************************/

  beforeEach(() => {
    emitEventSpy = sandbox.spy();
    storageUser = storageUserFactory( emitEventSpy, dataStructures.mapDetails );
  } );

  afterEach(() => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should get all users sorted by specified criteria and limited by specified limit", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return Promise.all( [

      dataStructures.sortObjectArray( testInstances, "verification.numVerAttempts", "Ascending" ),
      dataStructures.sortObjectArray( testInstancesCopy, "verification.numVerAttempts", "Descending" ),

      storageUser.get( null, {
        criteria: "numVerAttempts",
        order: "Ascending"
      }, 1 ),
      storageUser.get( null, {
        criteria: "numVerAttempts",
        order: "Descending"
      }, 2 )

    ] )
      .then(( results: UserModel[][] ) => {

        expect( results ).to.satisfy(( results: UserModel[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 4 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let controlGroupAscending: UserModel[] = results[ 0 ];
          let controlGroupDescending: UserModel[] = results[ 1 ];

          let testGroupAscending: UserModel[] = results[ 2 ];
          let testGroupDescending: UserModel[] = results[ 3 ];

          /**********************************************/

          if ( !testGroupAscending || !testGroupAscending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !testGroupDescending || !testGroupDescending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !controlGroupAscending || !controlGroupAscending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !controlGroupDescending || !controlGroupDescending.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          for ( let i = 0; i < testGroupAscending.length; i++ ) {
            if ( testGroupAscending[ i ].verification.numVerAttempts !== controlGroupAscending[ i ].verification.numVerAttempts ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          for ( let i = 0; i < testGroupDescending.length; i++ ) {
            if ( testGroupDescending[ i ].verification.numVerAttempts !== controlGroupDescending[ i ].verification.numVerAttempts ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
              return false;
            }
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should distinguish between verified and unverified users", () => {

<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return Promise.all( [

      storageUser.get( {
        verified: true
      }, null, null ),

      storageUser.get( {
        verified: false
      }, null, null )

    ] )
      .then(( results: interfaces.dataModel.User[][] ) => {

        expect( results ).to.satisfy(( results: interfaces.dataModel.User[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let verifiedUsers: interfaces.dataModel.User[] = results[ 0 ];
          let unverifiedUsers: interfaces.dataModel.User[] = results[ 1 ];

          /**********************************************/

          if ( !verifiedUsers || !verifiedUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !unverifiedUsers || !unverifiedUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = verifiedUsers.filter(( user: interfaces.dataModel.User ) => {
            return ( !user.verification.verified );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          culprits = unverifiedUsers.filter(( user: interfaces.dataModel.User ) => {
            return ( user.verification.verified );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should get all users within the specified range of numVerAttempts", () => {

<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( {
      numVerAttemptsMin: 5,
      numVerAttemptsMax: 8
    }, null, null )
      .then(( foundUsers: interfaces.dataModel.User[] ) => {

        expect( foundUsers ).to.satisfy(( users: interfaces.dataModel.User[] ) => {

          if ( !users || users.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = users.filter(( user: interfaces.dataModel.User ) => {
            return ( user.verification.numVerAttempts < 5 || user.verification.numVerAttempts > 8 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should distinguish users by gender within specified age range", () => {

<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( {
      gender: "Female",
      ageMin: 20
    }, null, null )
      .then(( foundUsers: interfaces.dataModel.User[] ) => {

        expect( foundUsers ).to.satisfy(( foundUsers: interfaces.dataModel.User[] ) => {

          if ( !foundUsers || !foundUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          let culprits = foundUsers.filter(( user: interfaces.dataModel.User ) => {
            return ( user.personalDetails.age < 20 || user.personalDetails.gender !== "Female" );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should get matching users by text search, correctly ranked", () => {

    expect( 1 ).to.equal( 1 );

  } );

  /************************************************************/

  it( "should distinguish between users using specified apps", () => {

    let testInstancesCopy = JSON.parse( JSON.stringify( testInstances ) );

<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return Promise.all( [

      storageUser.get( {
        activeApps: [ "Call263" ]
      }, null, null ),

      storageUser.get( {
        activeApps: [ "GrocRound" ]
      }, null, null )

    ] )
      .then(( results: interfaces.dataModel.User[][] ) => {

        expect( results ).to.satisfy(( results: interfaces.dataModel.User[][] ) => {

          /**********************************************/

          if ( !results || results.length !== 2 ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let call263Users: interfaces.dataModel.User[] = results[ 0 ];
          let grocRoundUsers: interfaces.dataModel.User[] = results[ 1 ];

          /**********************************************/

          if ( !call263Users || !call263Users.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !grocRoundUsers || !grocRoundUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          let culprits = call263Users.filter(( user: interfaces.dataModel.User ) => {
            return ( user.activeApps.indexOf( "Call263" ) === -1 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          culprits = grocRoundUsers.filter(( user: interfaces.dataModel.User ) => {
            return ( user.activeApps.indexOf( "GrocRound" ) === -1 );
          } );

          if ( culprits && culprits.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          /**********************************************/

          return true;

          /**********************************************/

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon retrieving user documents", () => {

<<<<<<< HEAD
<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( null , null , null )
      .then( ( foundUsers : interfaces.dataModel.User[] ) => {
=======
    return storageUser.get( null, null, null )
      .then(( foundUsers: interfaces.dataModel.User[] ) => {
>>>>>>> workarea

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.user.Got;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.user.Got ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageUser" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "Got" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "numDocuments" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.data.numDocuments !== foundUsers.length ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring", () => {

<<<<<<< HEAD
<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( null , null , null , true )
      .then( ( response : any ) => {
=======
    return storageUser.get( null, null, null, true )
      .then(( response: any ) => {
>>>>>>> workarea

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent: interfaces.events.utilities.storageManager.user.GetFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy(( happening: interfaces.events.utilities.storageManager.user.GetFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageUser" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "GetFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "filtrationCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "sortCriteria" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "limit" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }
          if ( !happening.data.hasOwnProperty( "reason" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should correctly structure rejection", () => {

<<<<<<< HEAD
<<<<<<< HEAD
    let b = aFactory( emitEventSpy );
    let storageUser = storageUserFactory( emitEventSpy , b.mapDetails );

=======
>>>>>>> workarea
    return storageUser.get( null , null , null , true )
      .then( ( response : any ) => {
=======
    return storageUser.get( null, null, null, true )
      .then(( response: any ) => {
>>>>>>> workarea

        expect( "2" ).to.eql( 3 );

      } )
      .catch(( reason: any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        expect( reason ).to.satisfy(( reason: any ) => {

          if ( !reason ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( reason.identifier !== "GetFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !reason.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !reason.data.hasOwnProperty( "reason" ) ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          return true;

        } );

      } );

  } );

  /************************************************************/

} );

/******************************************************************************/
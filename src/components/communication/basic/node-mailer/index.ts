/******************************************************************************/

import * as Promise from "bluebird";
import * as express from "express";
import * as nodemailer from "nodemailer";

import * as interfaces from "../../../../interfaces";
import * as communicationInterfaces from "../../../../interfaces/components/communication";
import * as modersInterfaces from "../../../../interfaces/components/shared-logic/moders";
import * as eventManagerInterfaces from "../../../../interfaces/setup-config/event-manager";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class BasicMailAgent implements communicationInterfaces.MailAgent {

  private readonly emitter: communicationInterfaces.mailAgent.Emitter;
  private readonly checkThrow: modersInterfaces.CheckThrow;
  private transporter: nodemailer.Transporter;

  /*****************************************************************/

  constructor( params: communicationInterfaces.mailAgent.Params ) {

    this.emitter = params.emitter;
    this.checkThrow = params.checkThrow;

    this.transporter = nodemailer.createTransport( {
      service: "gmail",
      auth: {
        user: params.commSettings.mailSendingAddress,
        pass: params.commSettings.mailSendingAddressPassword
      }
    } );

  }

  /*****************************************************************/

  readonly sendEmail = ( from: string, to: string[], subject: string, html: string, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<void>(( resolve, reject ) => {

          let mailOptions: communicationInterfaces.mailAgent.MailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
          };

          this.transporter.sendMail( mailOptions, ( err: any, info: any ) => {
            if ( err ) {
              reject( err );
            } else {
              new Promise<void>(( resolve, reject ) => {
                this.emitter.emailSent( {
                  from: from,
                  to: to,
                  subject: subject,
                  html: html
                } );
                resolve();
              } );
              resolve();
            }

          } );

        } )

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.sendEmailFailed( {
            from: from,
            to: to,
            subject: subject,
            html: html,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "SendEmailFailed",
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
  emitEvent: eventManagerInterfaces.Emit,
  checkThrow: modersInterfaces.CheckThrow,
  commSettings: communicationInterfaces.CommSettings
} ): communicationInterfaces.MailAgent => {
  return new BasicMailAgent( {
    emitter: emitterFactory( params.emitEvent ),
    checkThrow: params.checkThrow,
    commSettings: params.commSettings
  } );
};

/******************************************************************************/
/******************************************************************************/

import { expect , assert } from "chai";
import * as sinon from "sinon";
import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";
let mongoose = require( "mongoose" );
mongoose.Promise = Promise;

import storageCartFactory from "../../../../../src/components/storage/mongodb/cart/index";
import dataStructuresFactory from "../../../../../src/components/shared-logic/basic/data-structures/index";

import * as src from "../../../../../src/src/index";
import { CartModel } from "../../../../../src/components/storage/mongodb/cart/model/index";

require( "../../connect-database" );
import prep from "./prep/index";

let logger = require( "tracer" ).colorConsole();

/******************************************************************************/

describe( "Cart AddDetailsD-BATCH" , function () : void {

  this.timeout( 2000 );

  /************************************************************/

  let sandbox : sinon.SinonSandbox = sinon.sandbox.create();
  let emitEventSpy : sinon.SinonSpy;

  let dataStructures : src.components.sharedLogic.DataStructures;
  let storageCart : src.components.storage.StorageCart;

  /************************************************************/

  before( ( done ) => {
    prep( done );
    dataStructures = dataStructuresFactory( sandbox.spy() );
  } );

  /************************************************************/

  beforeEach( () => {
    emitEventSpy = sandbox.spy();
    storageCart = storageCartFactory( emitEventSpy , dataStructures.mapDetails );
  } );

  afterEach( () => {
    sandbox.restore();
  } );

  /************************************************************/

  it( "should add a batch of new cart records" , () => {

    let newCartBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        adminFeePercentage : 10 ,
        numProducts : 0 ,
        costProducts : 0
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        adminFeePercentage : 10 ,
        numProducts : 0 ,
        costProducts : 0
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        adminFeePercentage : 10 ,
        numProducts : 0 ,
        costProducts : 0
      }
    ];

    return storageCart.addBatch( newCartBatch )
      .then( ( carts : CartModel[] ) => {

        expect( carts ).to.satisfy( ( carts : CartModel[] ) => {

           if ( !carts || !carts.length ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           if ( carts.length != 3 ) {
             logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
           }

           return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit event upon adding a batch of new cart documents" , () => {

    let newCartBatch = [
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        adminFeePercentage : 10 ,
        numProducts : 0 ,
        costProducts : 0
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        adminFeePercentage : 10 ,
        numProducts : 0 ,
        costProducts : 0
      } ,
      {
        userId : mongoose.Types.ObjectId() ,
        roundId : mongoose.Types.ObjectId() ,
        adminFeePercentage : 10 ,
        numProducts : 0 ,
        costProducts : 0
      }
    ];

    return storageCart.addBatch( newCartBatch )
      .then( ( cart : CartModel[] ) => {

        sinon.assert.callCount( emitEventSpy , 3 );

        expect( emitEventSpy ).to.satisfy( ( emitEventSpy : sinon.SinonSpy ) => {

          let emittedEvent : src.events.components.storage.cart.Added;

          for ( let i = 0; i < 3 ; i++ ) {

            emittedEvent = emitEventSpy.getCall( i ).args[ 0 ];

            if ( !emittedEvent ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.context !== "StorageCart" ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( emittedEvent.identifier !== "Added" ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( !emittedEvent.data ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

            if ( !emittedEvent.data.hasOwnProperty( "document" ) ) {
              logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
            }

          }

          return true;

        } );

      } );

  } );

  /************************************************************/

  it( "should emit failed event upon erring" , () => {

    return storageCart.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        let emittedEvent : src.events.components.storage.cart.AddFailed;
        emittedEvent = emitEventSpy.getCall( 0 ).args[ 0 ];

        expect( emittedEvent ).to.satisfy( ( happening : src.events.components.storage.cart.AddFailed ) => {

          if ( !happening ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.context !== "StorageCart" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( happening.identifier !== "AddFailed" ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( !happening.data.hasOwnProperty( "details" ) ) {
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

  it( "should correctly structure rejection" , () => {

    return storageCart.addBatch( [] , true )
      .then( ( response : any ) => {

        expect( "2" ).to.eql( 3 );

      } )
      .catch( ( reason : any ) => {

        sinon.assert.calledOnce( emitEventSpy );

        expect( reason ).to.satisfy( ( reason : any ) => {

          if ( !reason ) {
            logger.debug( "<<<<<<<<<<<-- GUILTY!" );
            return false;
          }

          if ( reason.identifier !== "AddBatchFailed" ) {
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

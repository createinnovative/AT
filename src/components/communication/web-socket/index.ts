/******************************************************************************/

import * as http from "http";

import * as eventListener from "../../../event-listener/interfaces";
import * as storageUser from "../../storage/interfaces/core/user";
import * as moders from "../../helpers/moders/interfaces";

import * as interfaces from "./interfaces";

import SocketIO from "./socket-io";
import Events from "./events";

import factory from "./factory";

/******************************************************************************/

export default (
  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  getUserById: storageUser.Instance[ "getById" ],
  production: boolean,
  httpServer: http.Server
): interfaces.Instance => {

  return factory( SocketIO, new Events( emitEvent ), checkThrow, getUserById, production, httpServer );

}

/******************************************************************************/

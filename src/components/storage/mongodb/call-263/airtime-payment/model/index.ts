/******************************************************************************/

import * as mongoose from "mongoose";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import * as x from "../../../basic-schema";
import * as user from "../../../core/user/model";

/******************************************************************************/

export interface Model extends ModelNuance, mongoose.Document { }
export interface ModelNuance extends mongoDB.Document {
  user: user.UserInfo;
  channelId: mongoose.Types.ObjectId;
  transaction: Transaction;
}
export interface PartialModel {
  user?: Partial<user.UserInfo>;
  channelId?: mongoose.Types.ObjectId;
  transaction?: Partial<Transaction>;
};

export interface Transaction {
  identifier: string;
  amount: number;
  method: string;
}

/******************************************************************************/

let airtimePaymentSchema = new mongoose.Schema( {

  user: {
    userId: mongoose.Schema.Types.ObjectId,
    emailAddress: { type: String },
    fullName: { type: String }
  },
  channelId: mongoose.Schema.Types.ObjectId,
  transaction: {
    identifier: { type: String },
    amount: { type: Number, min: 0, default: 0 },
    method: { type: String }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let MongooseModel = mongoose.model<Model>( "AirtimePayment", airtimePaymentSchema );

export { MongooseModel };

/******************************************************************************/

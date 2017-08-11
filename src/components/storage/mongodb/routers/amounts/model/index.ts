/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../../../../../interfaces";
import * as mongoDB from "../../../../../../components/storage/mongodb";

import { ignoreEmpty } from "../../../preparation";

/******************************************************************************/

export interface Model extends Model_Nuance, mongoose.Document { }
export interface Model_Nuance extends mongoDB.Document {
  type: string;
  count: number;
  newStock: number;
  sold: number;
}
export type Model_Partial = Partial<Model_Nuance>;

/******************************************************************************/

let amountsSchema = new mongoose.Schema( {

  type: { type: String, set: ignoreEmpty },
  count: { type: Number, min: 0, default: 0 },
  newStock: { type: Number, min: 0, default: 0 },
  sold: { type: Number, min: 0, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

} );

/******************************************************************************/

let AmountsMongooseModel = mongoose.model<Model>( "Amounts", amountsSchema );

export { AmountsMongooseModel };

/******************************************************************************/
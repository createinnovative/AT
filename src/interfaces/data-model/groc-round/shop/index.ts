/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  shopName: string;
  images?: string[];
  numProducts: number;
}

/******************************************************************************/
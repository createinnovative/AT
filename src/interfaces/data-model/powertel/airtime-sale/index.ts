/******************************************************************************/

import * as interfaces from "../../../../interfaces";

/******************************************************************************/

export interface Super extends interfaces.dataModel.DataModel {
  buyer: string;
  card?: {
    cardId: string;
    mdn: number;
  };
  user?: interfaces.dataModel.core.UserInfo;
  amount: number;
  bundles?: {
    gb: number;
    days: number;
  };
}

/******************************************************************************/
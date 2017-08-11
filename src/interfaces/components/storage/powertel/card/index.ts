/******************************************************************************/

import * as Promise from "bluebird";

import * as interfaces from "../../../../../interfaces";
import * as events from "./events";

/******************************************************************************/

export interface Emitter {
  readonly got: ( params: events.GotData ) => events.Got;
  readonly getFailed: ( params: events.GetFailedData ) => events.GetFailed;
  readonly gotById: ( params: events.GotByIdData ) => events.GotById;
  readonly getByIdFailed: ( params: events.GetByIdFailedData ) => events.GetByIdFailed;
  readonly added: ( params: events.AddedData ) => events.Added;
  readonly addFailed: ( params: events.AddFailedData ) => events.AddFailed;
  readonly updated: ( params: events.UpdatedData ) => events.Updated;
  readonly updateFailed: ( params: events.UpdateFailedData ) => events.UpdateFailed;
  readonly removed: ( params: events.RemovedData ) => events.Removed;
  readonly removeFailed: ( params: events.RemoveFailedData ) => events.RemoveFailed;
}

/******************************************************************************/

export interface Get {
  ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]>;
}

/******************************************************************************/

export interface GetById {
  ( cardId: string, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

/******************************************************************************/

export interface AddBatch {
  ( detailArray: AddDetails[], forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]>;
}

export interface Add {
  ( details: AddDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

/******************************************************************************/

export interface Update {
  ( filtrationCriteria: FiltrationCriteria, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super[]>;
}

export interface UpdateById {
  ( cardId: string, updates: UpdateDetails, forceThrow?: boolean ): Promise<interfaces.dataModel.powertel.card.Super>;
}

/******************************************************************************/

export interface Remove {
  ( filtrationCriteria: FiltrationCriteria, forceThrow?: boolean ): Promise<void>;
}

export interface RemoveById {
  ( cardId: string, forceThrow?: boolean ): Promise<void>;
}

/******************************************************************************/

export interface AddDetails {
  pin: number;
  puk: number;
  mdn: number;
  buyer?: {
    cardSaleId: string;
    fullName: string;
  };
  user?: interfaces.dataModel.core.UserInfo;
}

/******************************************************************************/

export type UpdateDetails = Partial<{
  pin: number;
  puk: number;
  mdn: number;
  buyer: Partial<{
    cardSaleId: string;
    fullName: string;
  }>;
  user?: Partial<interfaces.dataModel.core.UserInfo>;
}>;

/******************************************************************************/

export type FiltrationCriteria = Partial<{
  pin: number;
  puk: number;
  mdn: number;
  buyer?: Partial<{
    cardSaleId: string;
    fullName: string;
  }>;
  user?: Partial<interfaces.dataModel.core.UserInfo>;
  textSearch: string;
}>;

/******************************************************************************/

export type SortOptions = "createdAt" | "updatedAt" | "mdn";

export interface SortCriteria {
  criteria: SortOptions;
  order: "Ascending" | "Descending";
}

/******************************************************************************/

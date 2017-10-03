"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
;
/******************************************************************************/
exports.RoundInfoSchema = {
    roundId: x.ObjectIdSchema,
    roundName: x.StringSchema
};
var roundSchema = new mongoose.Schema({
    roundName: x.StringSchema,
    inProgress: x.BooleanSchema,
    duration: {
        start: { type: Date },
        end: { type: Date },
        months: x.NumberSchema,
    },
    deliveries: {
        fee: x.NumberSchema,
        numPayments: x.NumberSchema,
        valuePayments: x.NumberSchema,
    },
    contributions: {
        num: x.NumberSchema,
        value: x.NumberSchema,
    },
    numTracks: x.NumberSchema,
    valueCartProducts: x.NumberSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Round", roundSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/

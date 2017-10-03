"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
/******************************************************************************/
exports.UserInfoSchema = {
    userId: x.ObjectIdSchema,
    emailAddress: x.StringSchema,
    fullName: x.StringSchema
};
var userSchema = new mongoose.Schema({
    emailAddress: x.StringSchema,
    accessLevel: x.StringSchema,
    password: x.StringSchema,
    resetCode: x.StringSchema,
    verification: {
        verified: x.BooleanSchema,
        verificationCode: x.StringSchema,
        numVerAttempts: x.NumberSchema
    },
    personalDetails: {
        firstName: x.StringSchema,
        lastName: x.StringSchema,
        dateOfBirth: { type: Date },
        gender: x.StringSchema
    },
    contactDetails: {
        phoneNumbers: [x.StringSchema]
    },
    residentialDetails: {
        country: x.StringSchema,
        province: x.StringSchema,
        address: x.StringSchema
    },
    subscriptions: [x.StringSchema],
    activeApps: [x.StringSchema],
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("User", userSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var mongoose=require("mongoose"),x=require("../../../basic-schema"),user=require("../../../core/user/model"),round=require("../../round/model"),deliveryFeeSchema=new mongoose.Schema({user:user.UserInfoSchema,round:round.RoundInfoSchema,payment:{identifier:x.StringSchema,amount:x.NumberSchema,method:x.StringSchema},createdAt:x.DateSchema,updatedAt:x.DateSchema}),MongooseModel=mongoose.model("DeliveryFee",deliveryFeeSchema);exports.MongooseModel=MongooseModel;
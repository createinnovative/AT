"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var mongoose=require("mongoose"),x=require("../../../basic-schema"),track=require("../../track/model"),product=require("../../product/model"),trackProductSchema=new mongoose.Schema({track:track.TrackInfoSchema,product:product.ProductInfoSchema,quantity:x.NumberSchema,value:x.NumberSchema,createdAt:x.DateSchema,updatedAt:x.DateSchema}),MongooseModel=mongoose.model("TrackProduct",trackProductSchema);exports.MongooseModel=MongooseModel;
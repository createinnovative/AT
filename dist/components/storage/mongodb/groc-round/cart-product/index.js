"use strict";function makeConditions(e){return new Promise(function(r,u){var d={};e.user&&(e.user.userId&&(d["user.userId"]=mongoose.Types.ObjectId(e.user.userId)),e.user.emailAddress&&(d["user.emailAddress"]=e.user.emailAddress),e.user.fullName&&(d["user.fullName"]=e.user.fullName)),e.round&&(e.round.roundId&&(d["round.roundId"]=mongoose.Types.ObjectId(e.round.roundId)),e.round.roundName&&(d["round.roundName"]=e.round.roundName)),e.cartId&&(d.cartId=mongoose.Types.ObjectId(e.cartId)),e.product&&(e.product.productId&&(d["product.productId"]=mongoose.Types.ObjectId(e.product.productId)),e.product.label&&(d["product.label"]=e.product.label),e.product.quantity&&(d["product.quantity"]={},e.product.quantity.min&&(d["product.quantity"].$gte=e.product.quantity.min),e.product.quantity.max&&(d["product.quantity"].$lte=e.product.quantity.max)),e.product.value&&(d["product.value"]={},e.product.value.min&&(d["product.value"].$gte=e.product.value.min),e.product.value.max&&(d["product.value"].$lte=e.product.value.max))),e.textSearch&&(d.$text={$search:e.textSearch}),r(d)})}function makeSortCriteria(e){return new Promise(function(r,u){var d;d=e.criteria,"Descending"===e.order&&(d="-"+d),r(d)})}function generateAddDetails(e){var r=[];return e.forEach(function(e){var u={user:{userId:mongoose.Types.ObjectId(e.user.userId),emailAddress:e.user.emailAddress},round:{roundId:mongoose.Types.ObjectId(e.round.roundId),roundName:e.round.roundName},cartId:mongoose.Types.ObjectId(e.cartId),product:{productId:mongoose.Types.ObjectId(e.product.productId),label:e.product.label,quantity:e.product.quantity,value:e.product.value}};e.user.fullName&&(u.user.fullName=e.user.fullName),r.push(u)}),r}function generateUpdateDetails(e,r){return new Promise(function(u,d){r.user&&(r.user.userId&&(e.user.userId=mongoose.Types.ObjectId(r.user.userId)),r.user.emailAddress&&(e.user.emailAddress=r.user.emailAddress),r.user.fullName&&(e.user.fullName=r.user.fullName)),r.round&&(r.round.roundId&&(e.round.roundId=mongoose.Types.ObjectId(r.round.roundId)),r.round.roundName&&(e.round.roundName=r.round.roundName)),r.cartId&&(e.cartId=mongoose.Types.ObjectId(r.cartId)),r.product&&(r.product.productId&&(e.product.productId=mongoose.Types.ObjectId(r.product.productId)),r.product.label&&(e.product.label=r.product.label),r.product.quantity&&(e.product.quantity=r.product.quantity),r.product.value&&(e.product.value=r.product.value)),u(e)})}function convertToAbstract(e,r){return void 0===r&&(r=!1),this.checkThrow(r).then(function(r){return new Promise(function(r,u){var d=[];e.forEach(function(e){var r={id:e._id.toHexString(),user:{userId:e.user.userId.toHexString(),emailAddress:e.user.emailAddress},round:{roundId:e.round.roundId.toHexString(),roundName:e.round.roundName},cartId:e.cartId.toHexString(),product:{productId:e.product.productId.toHexString(),label:e.product.label,quantity:e.product.quantity,value:e.product.value},createdAt:e.createdAt,updatedAt:e.updatedAt};e.user.fullName&&(r.user.fullName=e.user.fullName),d.push(r)}),r(d)})})}Object.defineProperty(exports,"__esModule",{value:!0});var Promise=require("bluebird"),mongoose=require("mongoose"),generic_model_class_1=require("../../generic-model-class"),generic_event_class_1=require("../../generic-event-class"),model_1=require("./model");exports.default=function(e,r,u){var d=new generic_event_class_1.default(e,"GrocRound|CartProduct");return new generic_model_class_1.default(d,model_1.MongooseModel,r,u,makeConditions,makeSortCriteria,generateAddDetails,generateUpdateDetails,convertToAbstract)};
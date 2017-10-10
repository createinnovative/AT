"use strict";function makeConditions(t){return new Promise(function(e,n){var i={};t.type&&(i.type=t.type),t.initialCount&&(i.initialCount={},t.initialCount.min&&(i.initialCount.$gte=t.initialCount.min),t.initialCount.max&&(i.initialCount.$lte=t.initialCount.max)),t.newCount&&(i.newCount={},t.newCount.min&&(i.newCount.$gte=t.newCount.min),t.newCount.max&&(i.newCount.$lte=t.newCount.max)),t.amount&&(i.amount={},t.amount.min&&(i.amount.$gte=t.amount.min),t.amount.max&&(i.amount.$lte=t.amount.max)),t.textSearch&&(i.$text={$search:t.textSearch}),e(i)})}function makeSortCriteria(t){return new Promise(function(e,n){var i;i=t.criteria,"Descending"===t.order&&(i="-"+i),e(i)})}function generateAddDetails(t){var e=[];return t.forEach(function(t){var n={type:t.type,initialCount:t.initialCount,newCount:t.newCount,amount:t.amount};e.push(n)}),e}function generateUpdateDetails(t,e){return new Promise(function(n,i){e.type&&(t.type=e.type),e.initialCount&&(t.initialCount=e.initialCount),e.newCount&&(t.newCount=e.newCount),e.amount&&(t.amount=e.amount),n(t)})}function convertToAbstract(t,e){return void 0===e&&(e=!1),this.checkThrow(e).then(function(e){return new Promise(function(e,n){var i=[];t.forEach(function(t){var e={id:t._id.toHexString(),type:t.type,initialCount:t.initialCount,newCount:t.newCount,amount:t.amount,createdAt:t.createdAt,updatedAt:t.updatedAt};i.push(e)}),e(i)})})}Object.defineProperty(exports,"__esModule",{value:!0});var Promise=require("bluebird"),generic_model_class_1=require("../../generic-model-class"),generic_event_class_1=require("../../generic-event-class"),model_1=require("./model");exports.default=function(t,e,n){var i=new generic_event_class_1.default(t,"Routers|NewRouterStock");return new generic_model_class_1.default(i,model_1.MongooseModel,e,n,makeConditions,makeSortCriteria,generateAddDetails,generateUpdateDetails,convertToAbstract)};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var mongoose=require("mongoose"),call_263_1=require("./call-263"),core_1=require("./core"),groc_round_1=require("./groc-round"),powertel_1=require("./powertel"),routers_1=require("./routers"),MongoDB=function(){return function(e,o,r){this.middleware=[],this.linkToDB="mongodb://127.0.0.1:27017/AthenaTest",this.connectToDatabase=function(e){mongoose.connect(e,function(o){if(o)throw new Error("Error connecting to database : "+e+", Error details : "+o);console.log("Connected to MongoDB database : "+e)})},this.connectToDatabase(this.linkToDB),this.core=core_1.default(e,o,r),this.call263=call_263_1.default(e,o,r),this.grocRound=groc_round_1.default(e,o,r),this.powertel=powertel_1.default(e,o,r),this.routers=routers_1.default(e,o,r)}}();exports.default=MongoDB;
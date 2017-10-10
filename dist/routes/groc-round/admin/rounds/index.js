"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Promise=require("bluebird"),express=require("express"),blocks=require("../../../validation/validation-blocks");exports.default=function(n,o,e,r,t,d){function u(n){return!!blocks.optionalWrong(n.body,"roundName","string")||(!!blocks.optionalWrong(n.body,"inProgress","boolean")||(!!blocks.optionalWrong(n.body,"duration","object")||(!!blocks.optionalWrong(n.body.duration,"start","string")||(!!blocks.optionalWrong(n.body.duration,"end","string")||(!!blocks.optionalWrong(n.body.duration,"months","number")||(!!blocks.optionalWrong(n.body,"deliveries","object")||!!blocks.optionalWrong(n.body.deliveries,"fee","number")))))))}function i(n){return blocks.absentWrong(n.body,"roundName","string")?(console.log("a"),!0):blocks.absentWrong(n.body,"inProgress","boolean")?(console.log("b"),!0):blocks.absentWrong(n.body,"duration","object")?(console.log("c"),!0):blocks.absentWrong(n.body.duration,"start","string")?(console.log("d"),!0):blocks.absentWrong(n.body.duration,"end","string")?(console.log("e"),!0):!!blocks.absentWrong(n.body.duration,"months","number")||(!!blocks.absentWrong(n.body,"deliveries","object")||!!blocks.absentWrong(n.body.deliveries,"fee","number"))}var a=express.Router();return a.get("/getRounds",function(o,e,r){return n(null,null,null).then(function(n){return d(e,"grocRound-admin",!0,null,{foundRounds:n,innerContext:"get-rounds"})}).catch(function(n){return d(e,"grocRound-admin",!1,null,{innerContext:"get-rounds"})})}),a.get("/getRound/:roundId",function(n,e,r){return n.params.roundId?o(n.params.roundId).then(function(n){return d(e,"grocRound-admin",!0,null,{foundRound:n,innerContext:"get-round"})}).catch(function(n){return n&&n.identifier&&"DocumentNotFound"===n.identifier?d(e,"grocRound-admin",!1,"Couldn't find round",{innerContext:"get-round"}):d(e,"grocRound-admin",!1,null,{innerContext:"get-round"})}):d(e,"grocRound-admin",!1,"Round ID is missing",{innerContext:"get-round"})}),a.post("/addRound",function(n,o,r){if(i(n))return console.log(n.body),d(o,"grocRound-admin",!1,"Something is wrong with the data you sent",{innerContext:"add-round"});new Promise(function(o,e){o({roundName:n.body.roundName,inProgress:n.body.inProgress,duration:{start:new Date(n.body.duration.start),end:new Date(n.body.duration.end),months:n.body.duration.months},deliveries:{fee:n.body.deliveries.fee,numPayments:0,valuePayments:0},contributions:{num:0,value:0},numTracks:0,valueCartProducts:0})}).then(function(n){return e(n)}).then(function(n){return d(o,"grocRound-admin",!0,null,{addedRound:n,innerContext:"add-round"})}).catch(function(n){return console.log(n),d(o,"grocRound-admin",!1,null,{innerContext:"add-round"})})}),a.post("/updateRound/:roundId",function(n,o,e){if(!n.params.roundId)return d(o,"grocRound-admin",!1,"Update id is missing",{innerContext:"update-round"});if(u(n))return console.log("Params:"+JSON.stringify(n.params)+", Body: "+JSON.stringify(n.body)),d(o,"grocRound-admin",!1,"Something is wrong with the data you sent",{innerContext:"update-round"});var t={};return n.body.roundName&&(t.roundName=n.body.roundName),n.body.inProgress&&(t.inProgress=n.body.inProgress),n.body.duration&&(t.duration={start:new Date(n.body.duration.start),end:new Date(n.body.duration.end),months:n.body.duration.months}),n.body.deliveries&&(t.deliveries={},n.body.deliveries.fee&&(t.deliveries.fee=n.body.deliveries.fee)),r(n.params.roundId,t).then(function(n){return d(o,"grocRound-admin",!0,null,{updatedRound:n,innerContext:"update-round"})}).catch(function(n){return n&&n.identifier&&"DocumentNotFound"===n.identifier?d(o,"grocRound-admin",!1,"Couldn't find round",{innerContext:"update-round"}):d(o,"grocRound-admin",!1,null,{innerContext:"update-round"})})}),a.get("/deleteRound/:roundId",function(n,o,e){return n.params.roundId?t(n.params.roundId).then(function(n){return d(o,"grocRound-admin",!0,null,{innerContext:"delete-round"})}).catch(function(n){return n&&n.identifier&&"DocumentNotFound"===n.identifier?d(o,"grocRound-admin",!1,"Couldn't find round",{innerContext:"delete-round"}):d(o,"grocRound-admin",!1,null,{innerContext:"delete-round"})}):d(o,"grocRound-admin",!1,"Round ID is missing",{innerContext:"delete-round"})}),a};
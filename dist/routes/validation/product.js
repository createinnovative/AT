"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var blocks=require("./validation-blocks");exports.absent=function(o){return!!blocks.absentWrong(o,"product","object")||exports.absentChildren(o.product)},exports.absentChildren=function(o){return!!blocks.absentWrong(o,"productId","string")||!!blocks.absentWrong(o,"label","string")},exports.optional=function(o){return!!blocks.optionalWrong(o,"product","object")||exports.optionalChildren(o.product)},exports.optionalChildren=function(o){return!!blocks.optionalWrong(o,"productId","string")||!!blocks.optionalWrong(o,"label","string")};
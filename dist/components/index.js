"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var helpers_1=require("../procedures/core/common/helpers"),authentication_1=require("./authentication"),communication_1=require("./communication"),storage_1=require("./storage"),session_1=require("./session"),response_1=require("./response"),helpers_2=require("./helpers"),Components=function(){return function(e,r,s,t,o,n){this.helpers=e,this.storage=r,this.session=s,this.authentication=t,this.communication=o,this.response=n}}();exports.default=function(e,r,s){var t=helpers_2.default(e),o=storage_1.default(e,t.dataStructures.mapDetails,t.moders.checkThrow),n=session_1.default(e,t.moders.checkThrow,o.core.user.getById,r),i=authentication_1.default(e,t.moders.checkThrow,o.core.user.get,o.core.user.getById,n.setCurrentUser,n.getCurrentUser,n.signOut,new helpers_1.default(t.moders.checkThrow).cleanUsers),u=communication_1.default(e,t.moders.checkThrow,"",r,s),c=response_1.default(e);return new Components(t,o,n,i,u,c)};
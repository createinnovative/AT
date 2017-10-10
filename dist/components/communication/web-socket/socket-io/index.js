"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Promise=require("bluebird"),IO=require("socket.io"),SocketIO=function(){return function(e,n,t,r,i){var o=this;this.events=e,this.checkThrow=n,this.getUserById=t,this.production=r,this.getUserSocket=function(e){return new Promise(function(n,t){var r=o.io.of("/");for(var i in r.connected){var s=r.connected[i];if(s.userId&&String(s.userId)===String(e))return n(s)}return t({identifier:"SocketNotFound",data:{}})}).catch(function(n){return new Promise(function(t,r){o.events.getUserSocketFailed({userId:e,reason:n}),t()}),n.identifier&&"SocketNotFound"===n.identifier?Promise.reject(n):Promise.reject({identifier:"GetUserSocketFailed",data:{reason:n}})})},this.pushToOtherUsers=function(e,n,t,r){return void 0===r&&(r=!1),o.checkThrow(r).then(function(n){return o.getUserSocket(e)}).then(function(e){return e.broadcast.emit(n,t),Promise.resolve()}).then(function(r){return new Promise(function(r,i){o.events.pushedToOtherUsers({userId:e,identifier:n,payload:t}),r()}),Promise.resolve()}).catch(function(r){return new Promise(function(i,s){o.events.pushToOtherUsersFailed({userId:e,identifier:n,payload:t,reason:r}),i()}),r.identifier&&"SocketNotFound"===r.identifier?Promise.reject(r):Promise.reject({identifier:"PushToOtherUsersFailed",data:{reason:r}})})},this.pushToCurrentUser=function(e,n,t,r){return void 0===r&&(r=!1),o.checkThrow(r).then(function(n){return o.getUserSocket(e)}).then(function(e){return e.emit(n,t),Promise.resolve()}).then(function(r){return new Promise(function(r,i){o.events.pushedToCurrentUser({userId:e,identifier:n,payload:t}),r()}),Promise.resolve()}).catch(function(r){return new Promise(function(i,s){o.events.pushToCurrentUserFailed({userId:e,identifier:n,payload:t,reason:r}),i()}),r.identifier&&"SocketNotFound"===r.identifier?Promise.reject(r):Promise.reject({identifier:"PushToCurrentUserFailed",data:{reason:r}})})},this.pushToChannels=function(e,n,t){return void 0===t&&(t=!1),o.checkThrow(t).then(function(t){return new Promise(function(t,r){e.forEach(function(e){o.io.sockets.in(e).emit(e,n),new Promise(function(t,r){o.events.pushedToChannel({channel:e,payload:n}),t()})}),t()})}).catch(function(t){return new Promise(function(r,i){o.events.pushToChannelsFailed({channels:e,payload:n,reason:t}),r()}),Promise.reject({identifier:"PushToChannelsFailed",data:{reason:t}})})},this.joinChannels=function(e,n,t){return void 0===t&&(t=!1),o.checkThrow(t).then(function(n){return o.getUserSocket(e)}).then(function(t){return n.forEach(function(n){t.join(n),new Promise(function(t,r){o.events.joinedChannel({channel:n,userId:e}),t()})}),Promise.resolve()}).catch(function(t){return new Promise(function(r,i){o.events.joinChannelsFailed({channels:n,userId:e,reason:t}),r()}),t.identifier&&"SocketNotFound"===t.identifier?Promise.reject(t):Promise.reject({identifier:"JoinChannelsFailed",data:{reason:t}})})},this.leaveChannels=function(e,n,t){return void 0===t&&(t=!1),o.checkThrow(t).then(function(n){return o.getUserSocket(e)}).then(function(t){return n.forEach(function(n){t.leave(n),new Promise(function(t,r){o.events.leftChannel({channel:n,userId:e}),t()})}),Promise.resolve()}).catch(function(t){return new Promise(function(r,i){o.events.leaveChannelsFailed({channels:n,userId:e,reason:t}),r()}),t.identifier&&"SocketNotFound"===t.identifier?Promise.reject(t):Promise.reject({identifier:"LeaveChannelsFailed",data:{reason:t}})})},this.setMware=function(){o.io.use(function(e,n){if(e&&e.handshake&&e.handshake.query){if(e.handshake.query.userData){var t=e.handshake.query.userData;if(!t._id)return;e.userId=t.id,o.getUserById(t.id).then(function(e){return Promise.resolve(e.subscriptions)}).then(function(n){n.forEach(function(n){e.join(n),new Promise(function(e,r){o.events.joinedChannel({channel:n,userId:t._id})})})}).catch(function(e){new Promise(function(n,r){o.events.getUserSubscriptionsFailed({userId:t._id,reason:e}),n()})})}return n()}})},this.io=this.production?IO.listen(i):IO(i)}}();exports.default=SocketIO;
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Events=function(){return function(t){var e=this;this.emitEvent=t,this.emailSent=function(t){var n={context:"MailAgent",tags:[],identifier:"EmailSent",data:{from:t.from,to:t.to,subject:t.subject,html:t.html}};return e.emitEvent(n),n},this.sendEmailFailed=function(t){var n={context:"MailAgent",tags:[],identifier:"SendEmailFailed",data:{from:t.from,to:t.to,subject:t.subject,html:t.html,reason:t.reason}};return e.emitEvent(n),n}}}();exports.default=Events;
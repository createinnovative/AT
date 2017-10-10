var GrocRoundAdminAddEditContributionComponent;!function(e){var n=function(){return function(e,n,t,i,o,r,s,d,u,a){var c=this;this.$q=e,this.$routeParams=n,this.$location=t,this.ToastService=i,this.ContributionsService=o,this.AutoCompleteService=r,this.SelectService=s,this.UsersService=d,this.RoundsService=u,this.SuperInfoService=a,this.clearMembers=function(){c.users=[],c.rounds=[],c.userText="",c.roundId="",c.productText="",c.addDetails={user:null,round:null,payment:{identifier:"",amount:0,method:""}},c.updateDetails={round:null,payment:{identifier:"",amount:0,method:""}}},this.determineModeAndGetData=function(){c.$routeParams.contributionId?(c.editMode=!0,c.loading=!0,c.$q.all([c.getContributionInfo(c.$routeParams.contributionId),c.getRounds()]).finally(function(){c.loading=!1})):(c.editMode=!1,c.$q.all([c.getUsers(),c.getRounds()]).then(function(e){var n=c.$location.search();n&&n.userId&&(c.userText=c.AutoCompleteService.reflectUser(n.userId,c.users)),n&&n.roundId&&(c.roundId=c.AutoCompleteService.reflectRound(n.roundId,c.rounds))}).finally(function(){c.loading=!1}))},this.getUsers=function(){c.loading=!0,c.UsersService.getUsers().then(function(e){c.users=[],c.SuperInfoService.users(c.UsersService.users).forEach(function(e){c.users.push(e)})}).catch(function(e){c.errorMessage=e&&e.message?e.message:"Couldn't get contribution record"}).finally(function(){c.loading=!1})},this.getRounds=function(){c.loading=!0,c.RoundsService.getRounds().then(function(e){c.rounds=[],e.forEach(function(e){c.rounds.push({roundId:e.id,roundName:e.roundName})})}).catch(function(e){c.errorMessage=e&&e.message?e.message:"Couldn't get contribution record"}).finally(function(){c.loading=!1})},this.getContributionInfo=function(e){c.loading=!0,c.ContributionsService.getContribution(e).then(function(e){c.metaUser=e.user,angular.copy(e.round,c.updateDetails.round),c.AutoCompleteService.reflectRound(e.round.roundId,c.rounds),angular.copy(e.payment,c.updateDetails.payment)}).catch(function(e){c.errorMessage=e&&e.message?e.message:"Couldn't get contribution record"}).finally(function(){c.loading=!1})},this.addContribution=function(){var e=c.AutoCompleteService.getUser(c.userText,c.users);if(!e)return c.ToastService.showSimple("User info is missing");c.addDetails.user.userId=e.userId,c.addDetails.user.emailAddress=e.emailAddress,e.fullName&&(c.addDetails.user.fullName=e.fullName);var n=c.SelectService.getRound(c.roundId,c.rounds);return n?(c.addDetails.round.roundId=c.roundId,c.addDetails.round.roundName=n.roundName,c.addDetails.payment.identifier?c.addDetails.payment.amount?c.addDetails.payment.method?(c.adding=!0,c.ContributionsService.addContribution(c.addDetails).then(function(e){c.$location.path("/contributions?userId="+c.addDetails.user.userId)}).finally(function(){c.adding=!1})):c.ToastService.showSimple("Payment method is missing"):c.ToastService.showSimple("Payment amount is missing"):c.ToastService.showSimple("Payment identifier is missing")):c.ToastService.showSimple("Round info is missing")},this.updateContribution=function(){var e=c.SelectService.getRound(c.roundId,c.rounds);return e?(c.updateDetails.round.roundId=e.roundId,c.updateDetails.round.roundName=e.roundName,c.updateDetails.payment.identifier?c.updateDetails.payment.amount?c.updateDetails.payment.method?(c.updating=!0,c.ContributionsService.updateContribution(c.$routeParams.contributionId,c.updateDetails).then(function(e){window.history.back()}).finally(function(){c.updating=!1})):c.ToastService.showSimple("Payment method is missing"):c.ToastService.showSimple("Payment amount is missing"):c.ToastService.showSimple("Payment identifier is missing")):c.ToastService.showSimple("Round info is missing")},this.clearMembers(),this.determineModeAndGetData()}}();e.Component=n}(GrocRoundAdminAddEditContributionComponent||(GrocRoundAdminAddEditContributionComponent={}));
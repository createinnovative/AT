var GrocRoundAdminAddEditTrackComponent;!function(e){var t=function(){return function(e,t,a,i,n,o,s){var r=this;this.$q=e,this.$routeParams=t,this.$location=a,this.ToastService=i,this.TracksService=n,this.RoundsService=o,this.SelectService=s,this.clearMembers=function(){r.rounds=[],r.addDetails={round:null,trackName:"",contributions:{installmentValue:0,totalValue:0},adminFeePercentage:0},r.updateDetails={trackName:"",contributions:{installmentValue:0,totalValue:0},adminFeePercentage:0}},this.determineModeAndGetData=function(){r.$routeParams.trackId?(r.editMode=!0,r.getTrackInfo(r.$routeParams.trackId)):(r.editMode=!1,r.getRounds())},this.getRounds=function(){r.loading=!0,r.RoundsService.getRounds().then(function(e){r.rounds=[],e.forEach(function(e){r.rounds.push({roundId:e.id,roundName:e.roundName})})}).catch(function(e){r.errorMessage=e&&e.message?e.message:"Couldn't get track record"}).finally(function(){r.loading=!1})},this.getTrackInfo=function(e){r.loading=!0,r.TracksService.getTrack(e).then(function(e){r.metaRound=e.round,r.updateDetails.trackName=e.trackName,r.updateDetails.contributions.installmentValue=e.contributions.installmentValue,r.updateDetails.contributions.totalValue=e.contributions.totalValue,r.updateDetails.adminFeePercentage=e.adminFeePercentage}).catch(function(e){r.errorMessage=e&&e.message?e.message:"Couldn't get track record"}).finally(function(){r.loading=!1})},this.addTrack=function(){var e=r.SelectService.getRound(r.addDetails.round.roundId,r.rounds);return e?(r.addDetails.round.roundName=e.roundName,r.addDetails.trackName?r.addDetails.contributions.installmentValue?r.addDetails.contributions.totalValue?r.addDetails.adminFeePercentage?(r.adding=!0,r.TracksService.addTrack(r.addDetails).then(function(e){r.$location.path("/tracks/"+r.addDetails.round.roundId)}).finally(function(){r.adding=!1})):r.ToastService.showSimple("Track name is missing"):r.ToastService.showSimple("Total price of track is missing"):r.ToastService.showSimple("Installment value is missing"):r.ToastService.showSimple("Track name is missing")):r.ToastService.showSimple("Round info is missing")},this.updateTrack=function(){return r.updateDetails.trackName?r.updateDetails.contributions.installmentValue?r.updateDetails.contributions.totalValue?r.updateDetails.adminFeePercentage?(r.updating=!0,r.TracksService.updateTrack(r.$routeParams.trackId,r.updateDetails).then(function(e){window.history.back()}).finally(function(){r.updating=!1})):r.ToastService.showSimple("Track name is missing"):r.ToastService.showSimple("Total price of track is missing"):r.ToastService.showSimple("Installment value is missing"):r.ToastService.showSimple("Track name is missing")},this.clearMembers(),this.determineModeAndGetData()}}();e.Component=t}(GrocRoundAdminAddEditTrackComponent||(GrocRoundAdminAddEditTrackComponent={}));
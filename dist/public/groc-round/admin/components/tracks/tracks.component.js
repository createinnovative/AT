var GrocRoundAdminTracksComponent;!function(n){var o=function(){return function(n,o,t){var r=this;this.$routeParams=n,this.$location=o,this.TracksService=t,this.getTracks=function(n){r.loading=!0,r.TracksService.getTracks(n).then(function(n){n.forEach(function(n){r.tracks.push(n)})}).catch(function(n){r.errorMessage=n&&n.message?n.message:"Operation Failed"}).finally(function(){r.loading=!1})},this.route=function(n){n&&r.$location.path(n)},this.tracks=[],this.$routeParams.roundId?this.getTracks(this.$routeParams.roundId):window.history.back()}}();n.Component=o}(GrocRoundAdminTracksComponent||(GrocRoundAdminTracksComponent={}));
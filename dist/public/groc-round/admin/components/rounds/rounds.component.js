var GrocRoundAdminRoundsComponent;!function(n){var o=function(){return function(n,o,t){var i=this;this.$routeParams=n,this.$location=o,this.RoundsService=t,this.getRounds=function(){i.loading=!0,i.RoundsService.getRounds().then(function(n){n.forEach(function(n){i.rounds.push(n)})}).catch(function(n){i.errorMessage=n&&n.message?n.message:"Operation Failed"}).finally(function(){i.loading=!1})},this.route=function(n){n&&i.$location.path(n)},this.rounds=[],this.loading=!1,this.getRounds()}}();n.Component=o}(GrocRoundAdminRoundsComponent||(GrocRoundAdminRoundsComponent={}));
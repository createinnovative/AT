var GrocRoundAdminTrackProductsComponent;!function(t){var o=function(){return function(t,o,r){var c=this;this.$routeParams=t,this.$location=o,this.TrackProductsService=r,this.getTrackProducts=function(t){c.loading=!0,c.TrackProductsService.getTrackProducts(t).then(function(t){t.forEach(function(t){c.trackProducts.push(t)})}).catch(function(t){c.errorMessage=t&&t.message?t.message:"Operation Failed"}).finally(function(){c.loading=!1})},this.route=function(t){t&&c.$location.path(t)},this.trackProducts=[],this.$routeParams.trackId?(this.trackId=this.$routeParams.trackId,this.getTrackProducts(this.$routeParams.trackId)):window.history.back()}}();t.Component=o}(GrocRoundAdminTrackProductsComponent||(GrocRoundAdminTrackProductsComponent={}));
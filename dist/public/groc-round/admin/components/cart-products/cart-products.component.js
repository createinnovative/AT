var GrocRoundAdminCartProductsComponent;!function(t){var o=function(){return function(t,o,r){var n=this;this.$routeParams=t,this.$location=o,this.CartProductsService=r,this.getCartProducts=function(t){n.CartProductsService.getCartProducts(t).then(function(t){t.forEach(function(t){n.cartProducts.push(t)})}).catch(function(t){n.errorMessage=t&&t.message?t.message:"Operation Failed"})},this.route=function(t){t&&n.$location.path(t)},this.cartProducts=[],this.$routeParams.cartId?this.getCartProducts(this.$routeParams.cartId):window.history.back()}}();t.Component=o}(GrocRoundAdminCartProductsComponent||(GrocRoundAdminCartProductsComponent={}));
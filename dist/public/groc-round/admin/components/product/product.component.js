var GrocRoundAdminProductComponent;!function(t){var o=function(){return function(t,o,r,e,i,n,c){var u=this;this.$q=t,this.$location=o,this.$routeParams=r,this.$mdDialog=e,this.ToastService=i,this.DialogService=n,this.ProductsService=c,this.addPrice=function(){},this.removePrice=function(t){},this.initMembers=function(){u.product={}},this.deriveProductId=function(){u.$routeParams.productId?u.getProductRecord(u.$routeParams.productId):window.history.back()},this.getProductRecord=function(t){u.loading=!0;var o=u.ProductsService.products.filter(function(o){return o.id===t});o.length?(u.product=u.ProductsService.products[u.ProductsService.products.indexOf(o[0])],u.loading=!1):u.ProductsService.getProduct(t).then(function(t){angular.copy(t,u.product)}).catch(function(t){u.errorMessage=t&&t.message?t.message:"Couldn't get product record"}).finally(function(){u.loading=!1})},this.deleteProduct=function(){u.deleting=!0,u.DialogService.showConfirm("Delete Product","Are you sure?",null).then(function(t){return t?u.ProductsService.removeProduct(u.product.id):u.$q.reject()}).then(function(t){u.$location.path("/products")}).finally(function(){u.deleting=!1})},this.initMembers(),this.deriveProductId()}}();t.Component=o}(GrocRoundAdminProductComponent||(GrocRoundAdminProductComponent={}));
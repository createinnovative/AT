var GrocRoundAdminAddPriceService;!function(e){var i=function(){return function(e,i){var r=this;this.$mdDialog=e,this.ShopsService=i,this.attachToPromise=function(){r.ShopsService.promises.getShops.then(function(e){e&&(r.error=null)}).catch(function(e){r.error=e&&e.message?e.message:"Couldn't get shops"})},this.getShops=function(){r.ShopsService.getShops().catch(function(e){r.error=e&&e.message?e.message:"Couldn't get shops"})},this.clear=function(){r.shopId="",r.quantity=1,r.price=0,r.error=""},this.add=function(){if(!r.shopId)return r.error="Shop details missing";if(!r.quantity)return r.error="Provide quantity";if(!r.price)return r.error="Provide price";var e=r.shops.filter(function(e){return e.id==r.shopId});return e.length?r.$mdDialog.hide({shop:e[0],quantity:r.quantity,price:r.price}):r.$mdDialog.hide(null),r.clear()},this.cancel=function(){r.$mdDialog.cancel()},this.clear(),this.shops=this.ShopsService.shops,this.attachToPromise(),this.shops.length||this.ShopsService.progress.getShops||this.getShops()}}();e.Service=i}(GrocRoundAdminAddPriceService||(GrocRoundAdminAddPriceService={}));
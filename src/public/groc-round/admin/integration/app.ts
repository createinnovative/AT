module App {

  import components = GrocRoundAdminComponentsIntegration;
  import services = GrocRoundAdminServicesIntegration;

  angular.module( "GrocRoundAdmin", [
    "ngMaterial",
    "ngAnimate",
    "ngRoute",
    "ngMessages",

    "shopsComponent", "shopComponent",
    "productsComponent", "productComponent",
    "cartsComponent", "cartComponent",
    "cartProductsComponent",
    "contributionsComponent",
    "deliveryFeesComponent",
    "roundContributorsComponent", "roundContributorComponent",
    "roundsComponent", "roundComponent",
    "tracksComponent", "trackComponent",
    "trackProductsComponent",

    "addEditCartProductComponent",
    "addEditContributionComponent",
    "addEditDeliveryFeeComponent",
    "addEditProductComponent",
    "addEditRoundComponent",
    "addEditShopComponent",
    "addEditTrackComponent",
    "addEditTrackProductComponent",

    "contextsService",
    "profileService"
  ] );

  angular.module( "GrocRoundAdmin" ).config( config );

  config.$inject = [
    "$locationProvider",
    "$routeProvider",
    "$mdThemingProvider"
  ];

  function config (
    $locationProvider: ng.ILocationProvider,
    $routeProvider: ng.route.IRouteProvider,
    $mdThemingProvider: ng.material.IThemingProvider
  ) {

    $mdThemingProvider.theme( "default" )
      .primaryPalette( "indigo", {
        'default': '400',
        'hue-1': '700',
        'hue-2': '800'
      } )
      .accentPalette( "deep-orange", {
        'default': '500',
        'hue-1': 'A700',
        'hue-2': '900'
      } )
      .warnPalette( "red" )
      .dark();

    $routeProvider.

      when( "/carts/:roundId", {
        template: "<carts-component></carts-component>"
      } )
      .when( "/cart/:cartId", {
        template: "<cart-component></cart-component>"
      } )

      .when( "/cart-products/:cartId", {
        template: "<carts-component></carts-component>"
      } )

      .when( "/contributions", {
        template: "<contributions-component></contributions-component>"
      } )

      .when( "/delivery-fees", {
        template: "<delivery-fees-component></delivery-fees-component>"
      } )

      .when( "/rounds", {
        template: "<rounds-component></rounds-component>"
      } )
      .when( "/round/:roundId", {
        template: "<round-component></round-component>"
      } )

      .when( "/round-contributors/:roundId", {
        template: "<round-contributors-component></round-contributors-component>"
      } )
      .when( "/round-contributor/:roundContributorId", {
        template: "<round-contributor-component></round-contributor-component>"
      } )

      .when( "/tracks/:roundId", {
        template: "<tracks-component></tracks-component>"
      } )
      .when( "/track/:trackId", {
        template: "<track-component></track-component>"
      } )

      .when( "/track-products/:trackId", {
        template: "<track-products-component></track-products-component>"
      } )
      .when( "/track-product/:trackId", {
        template: "<track-product-component></track-product-component>"
      } )

      .when( "/shops", {
        template: "<shops-component></shops-component>"
      } )
      .when( "/shops/:shopId", {
        template: "<shop-component></shop-component>"
      } )

      .when( "/products", {
        template: "<products-component></products-component>"
      } )
      .when( "/products/:productId", {
        template: "<product-component></product-component>"
      } )

      .when( "/add-edit-cart-product", {
        template: "<add-edit-cart-product-component></add-edit-cart-product-component>"
      } )
      .when( "/add-edit-cart-product/:cartProductId", {
        template: "<add-edit-cart-product-component></add-edit-cart-product-component>"
      } )

      .when( "/add-edit-contribution", {
        template: "<add-edit-contribution-component></add-edit-contribution-component>"
      } )
      .when( "/add-edit-contribution/:contributionId", {
        template: "<add-edit-contribution-component></add-edit-contribution-component>"
      } )
      
      .when( "/add-edit-delivery-fee", {
        template: "<add-edit-elivery-fee-component></add-edit-elivery-fee-component>"
      } )
      .when( "/add-edit-delivery-fee/:deliveryFeeId", {
        template: "<add-edit-delivery-fee-component></add-edit-delivery-fee-component>"
      } )

      .when( "/add-edit-round", {
        template: "<add-edit-round-component></add-edit-round-component>"
      } )
      .when( "/add-edit-round/:roundId", {
        template: "<add-edit-round-component></add-edit-round-component>"
      } )

      .when( "/add-edit-track", {
        template: "<add-edit-track-component></add-edit-track-component>"
      } )
      .when( "/add-edit-track/:trackId", {
        template: "<add-edit-track-component></add-edit-track-component>"
      } )

      .when( "/add-edit-track-product", {
        template: "<add-edit-track-product-component></add-edit-track-product-component>"
      } )
      .when( "/add-edit-track-product/:trackProductId", {
        template: "<add-edit-track-product-component></add-edit-track-product-component>"
      } )

      .when( "/add-edit-shop", {
        template: "<add-edit-shop-component></add-edit-shop-component>"
      } )
      .when( "/add-edit-shop/:shopId", {
        template: "<add-edit-shop-component></add-edit-shop-component>"
      } )

      .when( "/add-edit-product", {
        template: "<add-edit-product-component></add-edit-product-component>"
      } )
      .when( "/add-edit-product/:productId", {
        template: "<add-edit-product-component></add-edit-product-component>"
      } )

      .otherwise( {
        template: "<rounds-component></rounds-component>"
      } );

  }

  angular.module( "GrocRoundAdmin" ).controller( "MainController", () => { } );

  components.integrate();
  services.integrate();

}

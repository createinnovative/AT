var AboutServicesIntegration;!function(e){e.integrate=function(){function e(e,t){return new ToastService.Service(e,t)}function t(e){return new AboutContextsService.Service(e)}angular.module("toastService",[]),angular.module("toastService").factory("ToastService",e),e.$inject=["$q","$mdToast"],angular.module("contextsService",[]),angular.module("contextsService").factory("ContextsService",t),t.$inject=["$http"],angular.module("descLimit",[]),angular.module("descLimit").filter("descLimit",DescLimitFilter.getFilter())}}(AboutServicesIntegration||(AboutServicesIntegration={}));
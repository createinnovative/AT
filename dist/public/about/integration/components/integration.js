var AboutComponentsIntegration;!function(e){e.integrate=function(){function e(e,t,o){return new AboutHomeComponent.Component(e,t,o)}function t(e){return new AboutSideNavWidget.Widget(e)}function o(e,t){return new AboutToolBarWidget.Widget(e,t)}angular.module("homeComponent",["toolBarWidget","sideNavWidget","toastService","contextsService","descLimit"]),angular.module("homeComponent").component("homeComponent",{templateUrl:"/about/components/home/home.template.html",controller:e}),e.$inject=["$q","ToastService","ContextsService"],angular.module("sideNavWidget",["contextsService"]),angular.module("sideNavWidget").component("sideNavWidget",{templateUrl:"/about/widgets/side-nav/side-nav.template.html",controller:t}),t.$inject=["ContextsService"],angular.module("toolBarWidget",["contextsService"]),angular.module("toolBarWidget").component("toolBarWidget",{templateUrl:"/about/widgets/tool-bar/tool-bar.template.html",controller:o,bindings:{title:"@"}}),o.$inject=["$mdSidenav","ContextsService"]}}(AboutComponentsIntegration||(AboutComponentsIntegration={}));
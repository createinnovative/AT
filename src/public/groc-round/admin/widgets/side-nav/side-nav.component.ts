module GrocRoundAdminSideNavWidget {

  import interfaces = GrocRoundAdminSideNavWidgetInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    public apps: interfaces.App[];
    public locals: interfaces.Local[];

    /***************************************************/

    constructor() {

      this.apps = [];
      this.locals = [];

      this.locals.push( {
        href: "#/rounds",
        icon: "group",
        caption: "Rounds"
      } );
      this.locals.push( {
        href: "#/shops",
        icon: "business",
        caption: "Shops"
      } );
      this.locals.push( {
        href: "#/products",
        icon: "loyalty",
        caption: "Products"
      } );

      this.apps.push( {
        href: "/call263/admin",
        icon: "call",
        caption: "Call263"
      } );
      this.apps.push( {
        href: "/powertel/admin",
        icon: "web",
        caption: "Powertel"
      } );
      this.apps.push( {
        href: "/routers/admin",
        icon: "router",
        caption: "Routers"
      } );
      

    }

    /***************************************************/
  }

}

  /*******************************************************************/
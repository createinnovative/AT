module GrocRoundAdminRoundsComponent {

  import interfaces = GrocRoundAdminRoundsComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import roundsService = GrocRoundAdminRoundsServiceInterfaces;
  import round = Round;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public rounds: round.Super[];
    public errorMessage: string;
    public loading: boolean;

    /***************************************************/

    constructor(
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly RoundsService: roundsService.Instance
    ) {

      this.rounds = [];
      this.loading = false;

      this.getRounds();

    }

    /***************************************************/

    private readonly getRounds = () => {

      this.loading = true;

      this.RoundsService.getRounds()
        .then( ( rounds: round.Super[] ) => {

          rounds.forEach( ( subject ) => {
            this.rounds.push( subject );
          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Operation Failed";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    public route = ( destination: string ) => {

      if ( destination ) {
        this.$location.path( destination );
      }

    }

    /***************************************************/

  }

}

  /*******************************************************************/

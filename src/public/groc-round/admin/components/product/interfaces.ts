module GrocRoundAdminProductComponentInterfaces {

  /*******************************************/

  import product = Product;
  import productsService = GrocRoundAdminProductsServiceInterfaces;

  /*******************************************/

  export interface Instance {
    product: product.Super;

    loading: boolean;
    loadingPrices: boolean;
    deleting: boolean;

    errorMessage: string;
    
    deleteProduct: DeleteProduct;
  }

  /*******************************************/

  export interface DeleteProduct {
    ( productId: string ): any;
  }

  /*******************************************/

}

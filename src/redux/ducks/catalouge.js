import { ecomMockData } from "../mockData";
//Actions
const ALL_PRODUCTS = "ALL_PRODUCTS";
const SEARCH_PRODUCT = "SEARCH_PRODUCT";
const FILTER_PRODUCT_BY_CATEGORY = "FILTER_PRODUCT_BY_CATEGORY";
const FILTER_PRODUCT_BY_BRAND = "FILTER_PRODUCT_BY_BRAND";
const ADD_TO_CART_PRODUCT = "ADD_TO_CART_PRODUCT";
const SORT_PRODUCT = "SORT_PRODUCT";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
//Reducer
const initialState = {
  productData: ecomMockData,
  filteredCategory: null,
  filteredBrands: null,
  searchedProducts: null,
  displayProducts: null,
  lastDisplayedProducts: null,
  productsInCart: [],
  productsAtCheckout: [],
  orderedProducts: [],
};
export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        filteredBrands: null,
        filteredCategory: state.productData,
        displayProducts: state.productData,
      };
    case SEARCH_PRODUCT: {
      const matchingProducts = state.productData.filter((product) => {
        if (product.title.toLowerCase().includes(payload)) {
          // console.log(product.title);
          return true;
        } else {
          // console.log(product.title);
          return false;
        }
      });
      console.log(matchingProducts);
      if (matchingProducts.length) {
        return {
          ...state,
          filteredCategory: null,
          filteredBrands: null,
          searchedProducts: matchingProducts,
          displayProducts: matchingProducts,
        };
      } else {
        return {
          ...state,
          searchedProducts: null,
          displayProducts: null,
          filteredCategory: null,
          filteredBrands: null,
        };
      }
    }
    case FILTER_PRODUCT_BY_CATEGORY: {
      const filteredProducts = state.productData.filter((product) => {
        // product.category.includes(payload)
        // console.log(product.category.split());
        // console.log(product.category.split().indexOf(`${payload}`));
        if (product.category.split().indexOf(`${payload}`) >= 0) {
          return true;
        } else {
          return false;
        }
        // return product.category.split().indexOf(`${payload}`);
      });
      // console.log(filteredProducts);
      return {
        ...state,
        filteredBrands: null,
        filteredCategory: filteredProducts,
        displayProducts: filteredProducts,
      };
    }

    case FILTER_PRODUCT_BY_BRAND: {
      const data = state.filteredCategory || state.productData;

      const filteredProducts = data.filter((product) =>
        payload.includes(product.brand)
      );
      return {
        ...state,
        filteredBrands: filteredProducts,
        displayProducts: filteredProducts,
      };
    }
    case SORT_PRODUCT: {
      const sortedProducts = [];
      if (payload === "lowToHigh") {
        state.lastDisplayedProducts =
          state.lastDisplayedProducts || state.displayProducts;

        sortedProducts.push(
          ...state.displayProducts.slice().sort((a, b) => {
            return a.price - b.price;
          })
        );
      } else if (payload === "highToLow") {
        state.lastDisplayedProducts =
          state.lastDisplayedProducts || state.displayProducts;
        sortedProducts.push(
          ...state.displayProducts.slice().sort((a, b) => {
            return b.price - a.price;
          })
        );
      } else {
        //for reset case
        //category selected
        //brand selected
        //searched products
        //make sure from front end user can't select reset if low/high was not selected in past
        return {
          ...state,
          displayProducts: state.lastDisplayedProducts,
          lastDisplayedProducts: null,
        };
      }
      return {
        ...state,
        displayProducts: sortedProducts,
      };
    }
    case ADD_TO_CART_PRODUCT: {
      const allProductsInCart = state.productsInCart;
      const product = state.displayProducts.filter((prod) => {
        return prod.id === payload;
      });
      allProductsInCart.push(...product);
      return {
        ...state,
        productsInCart: allProductsInCart,
      };
    }
    case REMOVE_FROM_CART: {
      const product = state.productsInCart.filter((prod) => {
        return prod.id !== payload;
      });
      console.log(product);
      return {
        ...state,
        productsInCart: product,
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        productsInCart: [],
      };
    }
    default:
      return state;
  }
}

export const showAllProductsAction = () => ({
  type: ALL_PRODUCTS,
});
export const filterCategoryAction = (value) => ({
  type: FILTER_PRODUCT_BY_CATEGORY,
  payload: value,
});
export const filterBrandAction = (value) => ({
  type: FILTER_PRODUCT_BY_BRAND,
  payload: value,
});

export const sortByAcion = (sortType) => ({
  type: SORT_PRODUCT,
  payload: sortType,
});

export const addToCartAction = (productId) => ({
  type: ADD_TO_CART_PRODUCT,
  payload: productId,
});
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const checkoutAction = () => ({
  type: CLEAR_CART,
});
export const searchAction = (searchKey) => ({
  type: SEARCH_PRODUCT,
  payload: searchKey,
});

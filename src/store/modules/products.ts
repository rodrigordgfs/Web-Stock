import { IProduct } from "@/interfaces/IProduct";
import ProductsService from "@/services/products";
import { State } from "@/store";
import {
  ADD_PRODUCTS, DELETE_PRODUCT, GETBYID_PRODUCT,
  GET_PRODUCTS,
  PATCH_PRODUCTS,
  POST_PRODUCTS, REMOVE_PRODUCT, SET_PRODUCTS
} from "@/utils/constants";
import { Module } from "vuex";

export interface ProductsState {
  products: IProduct[];
}

export const product: Module<ProductsState, State> = {
  state: {
    products: [],
  },
  getters: {},
  mutations: {
    [SET_PRODUCTS](state, products: IProduct[]) {
      state.products = products;
    },

    [ADD_PRODUCTS](state, product: IProduct) {
      state.products.push(product);
    },

    [REMOVE_PRODUCT](state, id: string) {
      state.products.filter((product) => product.id !== id);
    },
  },
  actions: {
    [GETBYID_PRODUCT](_, id: string) {
      return ProductsService.getByID(id);
    },

    [GET_PRODUCTS]({ commit }) {
      return ProductsService.get().then(({ data }) => {
        commit(SET_PRODUCTS, data);
      });
    },

    [POST_PRODUCTS]({ commit }, products: IProduct) {
      return ProductsService.post(products).then(({ data }) => {
        commit(ADD_PRODUCTS, data);
      });
    },

    [PATCH_PRODUCTS]({ commit }, products: IProduct) {
      return ProductsService.patch(products.id, products).then(({ data }) => {
        commit(ADD_PRODUCTS, data);
      });
    },

    [DELETE_PRODUCT]({ commit }, id: string) {
      return ProductsService.delete(id).then(() => {
        commit(REMOVE_PRODUCT, id);
      });
    },
  },
};

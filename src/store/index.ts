import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { CategoriesState, category } from "./modules/categories";
import { product, ProductsState } from "./modules/products";
import { UnitiesState, unity } from "./modules/unities";
export interface State {
  category: CategoriesState;
  unity: UnitiesState;
  product: ProductsState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    category: {
      categories: [],
    },
    unity: {
      unities: [],
    },
    product: {
      products: [],
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    category,
    unity,
    product,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}

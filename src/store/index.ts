import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { CategoriesState, category } from "./modules/categories";
export interface State {
  category: CategoriesState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    category: {
      categories: [],
    },
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    category,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
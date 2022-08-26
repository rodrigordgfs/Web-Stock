import { ICategory } from "@/interfaces/ICategory";
import CategoriesService from "@/services/categories";
import { State } from "@/store";
import { GET_CATEGORIES, POST_CATEGORIES, SET_CATEGORIES } from "@/utils/constants";
import { Module } from "vuex";

export interface CategoriesState {
  categories: ICategory[];
}

export const category: Module<CategoriesState, State> = {
  state: {
    categories: [],
  },
  getters: {},
  mutations: {
    [SET_CATEGORIES](state, categories: ICategory[]) {
      state.categories = categories;
    },
  },
  actions: {
    [GET_CATEGORIES]({ commit }) {
      return CategoriesService.get().then(({ data }) => {
        commit(SET_CATEGORIES, data);
      });
    },

    [POST_CATEGORIES]({ commit }, category: ICategory) {
      return CategoriesService.post(category).then(({ data }) => {
        commit(SET_CATEGORIES, data);
      });
    }
  },
};

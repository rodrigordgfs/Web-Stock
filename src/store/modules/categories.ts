import { ICategory } from "@/interfaces/ICategory";
import { State } from "@/store";
import { GET_CATEGORIES, SET_CATEGORIES } from "@/utils/constants";
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
      commit(SET_CATEGORIES, [
        {
          id: 1,
          name: "Alimentação",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel aliquam erat.",
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          id: 2,
          name: "Combustível",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel aliquam erat.",
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          id: 3,
          name: "Lazer",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel aliquam erat.",
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          id: 4,
          name: "Saúde",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel aliquam erat.",
          createdAt: "2020-01-01T00:00:00.000Z",
        },
        {
          id: 5,
          name: "Transporte",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel aliquam erat.",
          createdAt: "2020-01-01T00:00:00.000Z",
        },
      ]);
    },
  },
};

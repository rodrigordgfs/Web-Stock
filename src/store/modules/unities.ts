import { IUnity } from "@/interfaces/IUnity";
import UnitiesService from "@/services/unities";
import { State } from "@/store";
import { GET_UNITIES, SET_UNITIES } from "@/utils/constants";
import { Module } from "vuex";

export interface UnitiesState {
  unities: IUnity[];
}

export const unity: Module<UnitiesState, State> = {
  state: {
    unities: [],
  },
  getters: {},
  mutations: {
    [SET_UNITIES](state, unities: IUnity[]) {
      state.unities = unities;
    },
  },
  actions: {
    [GET_UNITIES]({ commit }) {
      return UnitiesService.get().then(({ data }) => {
        commit(SET_UNITIES, data);
      });
    },
  },
};

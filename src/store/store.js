import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    morphemeIndex: "morphemes",
    wordIndex: "words",
    morphemeList: [],
  },
  mutations: {
    //methods
    SET_MORPHEME_LIST(state, list) {
      state.morphemeList = list;
    },
    ADD_MORPHEME_TO_LIST(state, newItem) {
      state.morphemeList.push(newItem);
    },
  },
  actions: {},
  getters: {
    //computed
  },
});

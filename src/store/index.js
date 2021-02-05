import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';

Vue.user(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
  }
});
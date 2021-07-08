import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = () => ({
  profile: {
    id: '',
    createdAt: '1999-03-27',
    imageUrl: 'default_profile.png'
  }
});

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
import { Auth } from 'aws-amplify';
import router from '../../../router';

export default {
  loginUser({ commit }, user) {
    commit("USER_LOGIN", user)
  },
  async logoutUser({ commit }) {
    await Auth.signOut({
      global: true, // sign-out from all devices and revoke all the tokens
    });

    commit("USER_LOGOUT");
    router.push('/').catch(() => {});
  },
  async signUp({ commit }, form) {
    const user = await Auth.signUp({
      username: form.username,
      password: form.password,
      attributes: {
        name: form.name,
      },
    });
    commit("USER_SIGNUP", user);
  },
};
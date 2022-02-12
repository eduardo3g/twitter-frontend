import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const initialState = {
  profile: {
    id: "",
    createdAt: "1999-03-27",
    imageUrl: "default_profile.png",
  },
  tweets: {
    tweets: [],
    nextToken: undefined,
  },
  followers: {
    followers: [],
    nextToken: undefined,
  },
  following: {
    following: [],
    nextToken: undefined,
  },
  search: {
    results: [],
    nextToken: undefined,
  },
  notifications: {
    all: [],
    mentions: [],
    newNotifications: 0,
    subscription: undefined,
    messages: {
      conversations: [],
      nextToken: undefined,
      newMessages: 0,
      conversationsSet: new Set(),
      active: {
        conversation: undefined,
        messages: [],
        nextTokenMessages: undefined,
      },
    },
  },
};

const state = () => ({ ...initialState });

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};

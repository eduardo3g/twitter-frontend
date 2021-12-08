import moment from "moment";

export default {
  profile: (state) => state.profile,
  tweets: (state) => state.tweets.tweets,
  nextTokenTweets: (state) => state.tweets.nextToken,
  joinedDate: (state) => moment(state.profile.createdAt).format("MMMM YYYY"),
  isSelf: (state) => (screenName) => state.profile.screenName == screenName,
  followers: (state) => state.followers.followers,
  nextTokenFollowers: (state) => state.followers.nextToken,
  following: (state) => state.following.following,
  nextTokenFollowing: (state) => state.following.nextToken,
  search: (state) => state.search.results,
  nextTokenSearch: (state) => state.search.nextToken,
};

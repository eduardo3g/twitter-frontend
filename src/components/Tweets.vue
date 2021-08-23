<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id">
      <Tweet v-if="!tweet.retweetOf" :tweet="tweet" />
      <Retweet v-if="tweet.retweetOf" :tweet="tweet" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tweet from "../components/Tweet.vue";
import Retweet from "../components/Retweet.vue";

export default {
  name: "Tweets",
  props: ["tweets"],
  components: {
    Tweet,
    Retweet,
  },
  computed: {
    ...mapGetters("twitter", {
      nextToken: "nextTokenTweets",
    }),
    ...mapGetters("twitter", ["profile"]),
  },
};
</script>

<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id">
      <Tweet :tweet="tweet" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tweet from "../components/Tweet.vue";

export default {
  name: "Tweets",
  components: {
    Tweet,
  },
  computed: {
    ...mapGetters("twitter", {
      nextToken: "nextTokenTweets",
    }),
    ...mapGetters("twitter", ["profile", "tweets"]),
  },
};
</script>

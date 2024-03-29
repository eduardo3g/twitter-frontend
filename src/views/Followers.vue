<template>
  <div id="app" class="flex container h-screen w-full">
    <div class="flex container h-screen w-full">
      <SideNav />

      <div class="w-full h-full overflow-y-scroll no-scrollbar">
        <!-- top navigation -->
        <div class="px-5 pt-3 flex items-center">
          <button
            @click="gotoProfile()"
            class="rounded-full p-3 px-4 focus:outline-none hover:bg-lightblue"
          >
            <i class="fas fa-arrow-left text-blue"></i>
          </button>
          <div class="lg:block ml-4">
            <h1 class="text-xl font-bold">{{ profile.name }}</h1>
            <p class="text-left text-sm leading-tight text-dark">
              @{{ profile.screenName }}
            </p>
          </div>
        </div>

        <div class="flex flex-row justify-evenly mt-2">
          <button
            class="w-1/2 text-dark font-bold border-b-2 border-blue px-10 py-4 hover:bg-lightblue"
          >
            Followers
          </button>
          <button
            @click="goToFollowing()"
            class="w-1/2 text-dark font-bold border-b-2 px-10 py-4 hover:bg-lightblue"
          >
            Following
          </button>
        </div>

        <Loader :loading="loading" />
        <Users :users="profiles" :loading="loading" />
      </div>

      <div
        class="hidden md:block w-1/3 z-0 h-full border-l border-lighter px-6 py-2 overflow-y-scroll no-scrollbar relative"
      >
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import SearchBar from "../components/SearchBar.vue";
import Users from "../components/Users.vue";
import Loader from "../components/Loader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Followers",
  components: {
    SideNav,
    SearchBar,
    Users,
    Loader,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters("profilePage", ["profile"]),
    ...mapGetters("profilePage", {
      profiles: "followers",
      nextToken: "nextTokenFollowers",
    }),
  },
  methods: {
    ...mapActions("authentication", ["loginUserIfAlreadyAuthenticated"]),
    ...mapActions("profilePage", ["loadProfile", "getFollowers"]),
    gotoProfile() {
      this.$router.push({
        name: "Profile",
        params: {
          screenName: this.profile.screenName,
        },
      });
    },
    goToFollowing() {
      this.$router.push({
        name: "Following",
        params: {
          screenName: this.profile.screenName,
        },
      });
    },
  },
  async created() {
    if (this.profiles.length > 0) this.loading = false;

    // handle full page reload
    await this.loginUserIfAlreadyAuthenticated();
    const screenName = this.$route.params.screenName;
    await this.loadProfile(screenName);
    await this.getFollowers({
      userId: this.profile.id,
      limit: 10,
    }).then(() => (this.loading = false));
  },
};
</script>

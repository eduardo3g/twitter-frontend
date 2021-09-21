<template>
  <div>
    <div v-if="!loading && users.length === 0" class="flex justify-center py-6">
      <span v-if="users.length === 0">No results</span>
    </div>

    <div :key="user.id" v-for="user in users">
      <User :user="user" />
    </div>
  </div>
</template>

<script>
import User from "./User.vue";

export default {
  name: "Users",
  props: ["users", "loading"],
  components: {
    User,
  },
};
</script>

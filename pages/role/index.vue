<template>
  <v-row align="start">
    <v-col cols="12" md="12">
      <div class="text-h4">{{ $metaInfo.title }}</div>
    </v-col>
    <v-col cols="12" md="12">
      <role-manager></role-manager>
    </v-col>
  </v-row>
</template>

<script>
import RoleManager from "~/components/role/manager.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Role/Hak Akses",
    };
  },

  components: {
    RoleManager,
  },
};
</script>

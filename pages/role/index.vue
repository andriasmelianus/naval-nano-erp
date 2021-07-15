<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <div class="text-center text-h4">{{ $metaInfo.title }}</div>
        <div class="text-center text-subtitle-1">
          Mengelola data role, termasuk di dalamnya menambahkan permission yang
          diperlukan.
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <role-manager></role-manager>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoleManager from "~/components/role/manager.vue";
export default {
  layout: "dashboard",

  head() {
    return {
      title: "Role & Permission (Hak Akses)",
    };
  },

  components: {
    RoleManager,
  },
};
</script>

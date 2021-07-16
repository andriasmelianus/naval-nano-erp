<template>
  <v-card>
    <v-row>
      <v-col cols="12" md="7">
        <user-default-table
          @record-selected="handleRecordSelected"
        ></user-default-table>
      </v-col>
      <v-col cols="12" md="5">
        <role-user-table :user="user"></role-user-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import UserDefaultTable from "./tables/default.vue";
import RoleUserTable from "~/components/role/tables/role-user.vue";
export default {
  components: {
    UserDefaultTable,
    RoleUserTable,
  },

  data: () => ({
    user: {},
  }),

  methods: {
    /**
     * Send the selected user to role-user component.
     * @returns void
     */
    handleRecordSelected(e) {
      if (e.value) {
        this.user = e.item;
      } else {
        this.user = {};
      }
    },
  },
};
</script>

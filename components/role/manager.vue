<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <role-default-table
            @record-selected="handleRecordSelected"
          ></role-default-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <permission-default-table :role="role"></permission-default-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoleDefaultTable from "./tables/default.vue";
import PermissionDefaultTable from "~/components/permission/tables/default.vue";
export default {
  components: {
    RoleDefaultTable,
    PermissionDefaultTable,
  },

  data: () => ({
    role: {},
  }),

  methods: {
    /**
     * Send the selected role to permission component.
     * @returns void
     */
    handleRecordSelected(e) {
      if (e.value) {
        this.role = e.item;
      } else {
        this.role = {};
      }
    },
  },
};
</script>

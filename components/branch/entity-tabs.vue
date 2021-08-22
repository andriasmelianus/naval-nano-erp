<template>
  <v-card>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account-lock</v-icon>
        Pengguna
      </v-tab>
      <v-tab>
        <v-icon left>mdi-account-supervisor-circle</v-icon>
        Karyawan
      </v-tab>
      <v-tab>
        <v-icon left>mdi-door-open</v-icon>
        Ruangan
      </v-tab>
      <v-tab>
        <v-icon left>mdi-chair-rolling</v-icon>
        Aset
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <user-default-small-table></user-default-small-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <employee-default-small-table></employee-default-small-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <room-default-small-table></room-default-small-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <asset-default-small-table></asset-default-small-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import UserDefaultSmallTable from "~/components/user/tables/default-small.vue";
import EmployeeDefaultSmallTable from "~/components/employee/tables/default-small.vue";
import RoomDefaultSmallTable from "~/components/room/tables/default-small.vue";
import AssetDefaultSmallTable from "~/components/asset/tables/default-small.vue";
export default {
  components: {
    UserDefaultSmallTable,
    RoomDefaultSmallTable,
    EmployeeDefaultSmallTable,
    AssetDefaultSmallTable,
  },
};
</script>

<style>
</style>
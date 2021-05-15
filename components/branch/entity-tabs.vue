<template>
  <v-card>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        Pengguna
      </v-tab>
      <v-tab>
        <v-icon left>mdi-page-next</v-icon>
        Ruangan
      </v-tab>
      <v-tab>
        <v-icon left>mdi-broom</v-icon>
        Karyawan
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <user-default-small-table></user-default-small-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <room-default-small-table></room-default-small-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <employee-default-small-table></employee-default-small-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import UserDefaultSmallTable from "~/components/user/_tables/default-small";
import RoomDefaultSmallTable from "~/components/room/_tables/default-small";
import EmployeeDefaultSmallTable from "~/components/employee/_tables/default-small";
export default {
  components: {
    UserDefaultSmallTable,
    RoomDefaultSmallTable,
    EmployeeDefaultSmallTable,
  },
};
</script>

<style>
</style>
<template>
  <v-data-table
    v-model="selectedRecords"
    show-select
    :headers="smallHeaders"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    :search="searchKeyword"
    :no-data-text="noDataText"
    @click:row="handleRowClicked"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-toolbar-title class="text-h6">Role</v-toolbar-title>
        <v-btn
          color="primary"
          icon
          :disabled="!enableAddRoleButton"
          @click="showForm(false)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn
          color="error"
          icon
          class="mr-3"
          :disabled="!enableDeleteRoleButton"
          @click="deassignRoles"
          ><v-icon>mdi-minus</v-icon></v-btn
        >
        <v-text-field
          label="Cari"
          v-model="searchKeyword"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>

      <v-dialog v-model="formIsShown" max-width="700px" ref="formDialog">
        <v-card>
          <role-selector-table
            @roles-assigned="assignRoles"
          ></role-selector-table>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { Handler } from "./handler";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import RoleSelectorTable from "./selector.vue";
export default {
  mixins: [Handler, MessageExtractor],

  components: {
    RoleSelectorTable,
  },

  props: {
    user: {
      type: Object,
      default: function () {
        return { id: 0 };
      },
    },
  },

  computed: {
    /**
     * Modify resource URI for fetch data.
     */
    resourceUriForVuetifyServerSideDataTable() {
      return this.resourceUri + "/vuetify-data-table-for-role-user";
    },

    /**
     * Construct a clearer message of no-data.
     * @returns {String}
     */
    noDataText() {
      if (this.user.id != undefined) {
        return "Pengguna: " + this.user.name + " tidak memiliki role";
      } else {
        return "Pengguna belum dipilih";
      }
    },

    /**
     * Determine that user can add role for selected user.
     * @returns {Boolean}
     */
    enableAddRoleButton() {
      return !!this.user.id && !!!this.user.is_built_in;
    },

    /**
     * Determine that user can remove role for selected user.
     * @returns {Boolean}
     */
    enableDeleteRoleButton() {
      return this.enableAddRoleButton && this.selectedRecords.length > 0;
    },
  },

  watch: {
    /**
     * Performs data fetch when selected user is changed.
     */
    user(newUser, oldUser) {
      let vm = this,
        user_id = 0; // Set non-existent user data if newRoleId is undefined.

      if (newUser.id != undefined) {
        user_id = newUser.id;
      }

      vm.selectedRecords = [];
      vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
        user_id: user_id,
      });
    },
  },

  methods: {
    /**
     * Send the selected roles to be attached to selected user.
     * @param {Array} roles
     * @return void
     */
    assignRoles(roles) {
      let vm = this,
        roleIds = roles.map(function (role) {
          return role.id;
        });

      vm.$axios
        .$post(vm.resourceUri + "/assign", {
          user_id: vm.user.id,
          role_ids: roleIds,
        })
        .then(function (result) {
          vm.$store.commit("global-snackbar/show", {
            color: "success",
            message: vm.messageSuccessExtract(result),
          });
          vm.closeForm();
          vm.readRecords();
        })
        .catch(function (result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.messageErrorExtract(result),
          });
        });
    },

    /**
     * Send the selected role to be detached from selected user.
     * @return void
     */
    deassignRoles() {
      let vm = this,
        roleIds = vm.selectedRecords.map(function (role) {
          return role.id;
        });

      vm.$axios
        .$post(vm.resourceUri + "/deassign", {
          user_id: vm.user.id,
          role_ids: roleIds,
        })
        .then(function (result) {
          vm.$store.commit("global-snackbar/show", {
            color: "success",
            message: vm.messageSuccessExtract(result),
          });
          vm.readRecords();
        })
        .catch(function (result) {
          vm.$store.commit("global-snackbar/show", {
            color: "error",
            message: vm.messageErrorExtract(result),
          });
        });
    },
  },
};
</script>

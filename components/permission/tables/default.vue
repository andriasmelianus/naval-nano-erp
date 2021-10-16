<template>
  <v-data-table
    v-model="selectedRecords"
    show-select
    :headers="headers"
    :items="records"
    :server-items-length="recordsTotal"
    :options.sync="serverParams"
    :loading="isLoading"
    :no-data-text="noDataText"
    :search="searchKeyword"
    @click:row="handleRowClicked"
    @item-selected="handleRecordSelected"
  >
    <template v-slot:top>
      <v-toolbar short flat>
        <v-toolbar-title class="text-h6">Permission</v-toolbar-title>
        <v-btn
          color="primary"
          icon
          :disabled="!enableAddPermissionButton"
          @click="showForm(false)"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn
          color="error"
          icon
          class="mr-3"
          :disabled="!enableDeletePermissionButton"
          @click="deassignPermissions"
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

      <v-dialog v-model="formIsShown" max-width="600px" ref="formDialog">
        <v-card>
          <permission-selector-table
            @permissions-assigned="assignPermissions"
          ></permission-selector-table>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { Handler } from "./handler";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import PermissionSelectorTable from "./selector.vue";
export default {
  mixins: [Handler, MessageExtractor],

  components: {
    PermissionSelectorTable,
  },

  props: {
    role: {
      type: Object,
      default: function () {
        return { id: 0 };
      },
    },
  },

  computed: {
    /**
     * Construct a clearer message of no-data.
     * @returns {String}
     */
    noDataText() {
      if (this.role.id != undefined) {
        return "Role: " + this.role.name + " tidak memiliki permission";
      } else {
        return "Role belum dipilih";
      }
    },

    /**
     * Determine that user can add permission under selected role.
     * @returns {Boolean}
     */
    enableAddPermissionButton() {
      return !!this.role.id && !!!this.role.is_built_in;
    },

    /**
     * Determine that user can remove permission under selected role.
     * @returns {Boolean}
     */
    enableDeletePermissionButton() {
      return this.enableAddPermissionButton && this.selectedRecords.length > 0;
    },
  },

  watch: {
    /**
     * Performs data fetch when selected role is changed.
     */
    role(newRole, oldRole) {
      let vm = this,
        role_id = 0; // Set non-existent role data if newRoleId is undefined.

      if (newRole.id != undefined) {
        role_id = newRole.id;
      }

      vm.selectedRecords = [];
      vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
        role_id: role_id,
      });
    },
  },

  methods: {
    /**
     * Send the selected permissions to be attached to selected role.
     * @param {Array} permissions
     * @return void
     */
    assignPermissions(permissions) {
      let vm = this,
        permissionIds = permissions.map(function (permission) {
          return permission.id;
        });

      vm.$axios
        .$post(vm.resourceUri + "/assign", {
          role_id: vm.role.id,
          permission_ids: permissionIds,
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
     * Send the selected permissions to be detached from selected role.
     * @return void
     */
    deassignPermissions() {
      let vm = this,
        permissionIds = vm.selectedRecords.map(function (permission) {
          return permission.id;
        });

      vm.$axios
        .$post(vm.resourceUri + "/deassign", {
          role_id: vm.role.id,
          permission_ids: permissionIds,
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

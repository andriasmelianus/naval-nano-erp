import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from "../record";
export const Handler = {
  mixins: [GlobalServerSideDataTableHandler],

  props: {
    resourceUri: {
      type: String,
      default: "/room"
    },

    // Branch for filtering purpose.
    branch: {
      type: Object,
      default: function() {
        return { id: 0 };
      }
    }
  },

  watch: {
    branch(newBranch, oldBranch) {
      let vm = this,
        branch_id = 0;

      if (newBranch.id != undefined) {
        branch_id = newBranch.id;
      }

      vm.otherServerParams = Object.assign({}, vm.otherServerParams, {
        branch_id: branch_id
      });
    }
  },

  data: () => ({
    headers: [
      { text: "Kode", value: "code" },
      { text: "Nama", value: "name", align: "left" },
      { text: "Lantai", value: "floor" },
      { text: "Deskripsi", value: "description" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallHeaders: [
      { text: "Kode", value: "code" },
      { text: "Nama", value: "name", align: "left" },
      { text: "Lantai", value: "floor" }
    ],
    singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: DefaultRecord,
    editedRecord: DefaultRecord
  })
};

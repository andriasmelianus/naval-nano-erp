import { GlobalServerSideDataTableHandler } from "~/components/_mixins/global-server-side-data-table-handler";
import { DefaultRecord } from '~/components/branch/record'
export const Handler = {
    mixins: [GlobalServerSideDataTableHandler],

    data: () => ({
        headers: [
            { text: "Nama", value: "name", align: "left" },
            { text: "Deskripsi", value: "description" },
            { text: "NPWP", value: "tax_id" },
            { text: "Bisnis", value: "business" },
            { text: "Industri", value: "industry" },
            { text: "Web", value: "website" },
            { text: "Catatan", value: "note" },
            { text: "Diinput", value: "created_at" },
            { text: "Diupdate", value: "updated_at" }
        ],
        smallHeaders: [{ text: "Nama", value: "name", align: "left" }],
        singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

        defaultRecord: DefaultRecord,
        editedRecord: DefaultRecord,

        resourceUri: "/branch"
    })
}
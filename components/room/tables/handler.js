import { GlobalServerSideDataTableHandler } from '~/components/_mixins/global-server-side-data-table-handler';
import { DefaultRecord } from '~/components/room/record'
export const Handler = {
    mixins: [GlobalServerSideDataTableHandler],

    data: () => ({
        headers: [
            { text: 'Kode', value: 'code' },
            { text: "Nama", value: "name", align: "left" },
            { text: "Lantai", value: "floor" },
            { text: "Deskripsi", value: "description" },
            { text: "Diupdate", value: "updated_at" }
        ],
        smallHeaders: [
            { text: 'Kode', value: 'code' },
            { text: "Nama", value: "name", align: "left" },
            { text: "Lantai", value: "floor" },
        ],
        singleColumnHeader: [{ text: "Nama", value: "name", align: "left" }],

        defaultRecord: DefaultRecord,
        editedRecord: DefaultRecord,

        resourceUri: "/room"
    })
}
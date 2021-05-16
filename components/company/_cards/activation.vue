<template>
  <v-card max-width="400" @click="activation(record)" hover>
    <v-card-text class="text-center">
      <div class="text-h4">
        {{ record.name }}
        <v-chip v-if="isActive" class="ma-2" color="green" text-color="white"
          >Aktif</v-chip
        >
        <div class="text-caption">{{ record.short_description }}</div>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <div class="text-subtitle-1">{{ record.legal_name }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],

  computed: {
    /**
     * Returns a boolean value whether the provided companyId is equal with current active company ID.
     * @param {*} companyId
     * @return Boolean
     */
    isActive() {
      return this.$auth.user.active_company_id == this.record.id;
    },
  },

  methods: {
    /**
     * Emit "choosen" event when this card is clicked.
     * @return void
     */
    activation(company) {
      this.$emit("choosen", company);
    },
  },
};
</script>

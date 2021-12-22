<template>
  <v-card :max-width="maxWidth" hover>
    <v-list-item two-line @click="handleCardClicked">
      <v-list-item-content>
        <v-list-item-title class="text-h5">{{
          record.title
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ record.entity }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-progress-linear
      :color="progressColor"
      :buffer-value="!!progressValue ? progressValue : undefined"
      :value="progressValue"
      :stream="!!progressValue"
    ></v-progress-linear>

    <v-card-text>
      {{ record.description }}
      <br />
      Diajukan: {{ record.creator_name }}
      <br />
      {{ record.updated_at }}
    </v-card-text>

    <v-card-actions v-if="!!record[attachmentsIndex].length">
      <v-btn @click="show = !show" block plain small>
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <v-chip
            v-for="attachment in record[attachmentsIndex]"
            :key="attachment.id"
            @click="downloadAttachment(attachment.id, attachment.name)"
            outlined
            color="success"
            class="mb-1"
          >
            {{ attachment.name }}</v-chip
          >
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],

  data: (vm) => ({
    show: false,
  }),
};
</script>

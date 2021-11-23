<template>
  <v-card max-width="300" hover>
    <v-card-title @click="handleCardClicked"> {{ record.title }} </v-card-title>
    <v-card-subtitle @click="handleCardClicked">{{
      record.entity
    }}</v-card-subtitle>
    <v-card-text @click="handleCardClicked">
      {{ record.description }}
      <br />
      <v-icon small>mdi-calendar</v-icon>&nbsp;&nbsp;{{
        $moment(record.date).format("DD-MMM-YYYY")
      }}
    </v-card-text>
    <v-card-actions>
      <!-- Additional buttons go here -->
      <v-spacer></v-spacer>
      <v-menu offset-x v-if="!!record[attachmentsIndex].length">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="attachment in record[attachmentsIndex]"
            :key="attachment.id"
            @click="downloadAttachment(attachment.id, attachment.name)"
          >
            <v-list-item-title>{{ attachment.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Handler } from "./handler";
export default {
  mixins: [Handler],
};
</script>

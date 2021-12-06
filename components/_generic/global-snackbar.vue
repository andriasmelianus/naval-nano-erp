<template>
  <v-snackbar
    v-model="isShown"
    :color="color"
    :timeout="timeout"
    bottom
    right
    dark
    multi-line
  >
    <div v-if="title" class="text-h6">{{ title }}</div>
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" icon @click="hide">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    isShown: {
      get() {
        return this.$store.getters["global-snackbar/isShown"];
      },
      set(isShown) {
        this.$store.commit("global-snackbar/hide");
      },
    },

    color() {
      return this.$store.getters["global-snackbar/color"];
    },

    timeout() {
      return this.$store.getters["global-snackbar/timeout"];
    },

    title() {
      return this.$store.getters["global-snackbar/title"];
    },

    message() {
      return this.$store.getters["global-snackbar/message"];
    },
  },

  methods: {
    hide() {
      this.$store.commit("global-snackbar/hide");
    },
  },
};
</script>

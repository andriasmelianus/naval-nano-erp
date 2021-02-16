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
        return this.$store.state.notification.isShown;
      },
      set(isShown) {
        this.$store.commit("notification/hide");
      },
    },

    color() {
      return this.$store.state.notification.color;
    },

    timeout() {
      return this.$store.state.notification.timeout;
    },

    message() {
      return this.$store.state.notification.message;
    },
  },

  methods: {
    hide() {
      this.$store.commit("notification/hide");
    },
  },
};
</script>

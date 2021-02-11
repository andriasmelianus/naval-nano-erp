<template>
  <v-app-bar fixed app color="blue darken-2" dark>
    <v-app-bar-nav-icon @click.stop="changeDrawerIsShownStatus" />

    <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
    </v-btn> -->
    <!-- <v-btn icon @click.stop="clipped = !clipped">
      <v-icon>mdi-application</v-icon>
    </v-btn> -->
    <!-- <v-btn icon @click.stop="fixed = !fixed">
      <v-icon>mdi-minus</v-icon>
    </v-btn> -->
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  props: {
    drawerIsShownProp: {
      type: Boolean,
    },
  },
  data() {
    return {
      drawerIsShown: true,
      title: process.env.APPLICATION_NAME,
    };
  },
  watch: {
    drawerIsShownProp(newValue) {
      this.drawerIsShown = newValue;
    },
  },

  methods: {
    changeDrawerIsShownStatus() {
      this.drawerIsShown = !this.drawerIsShown;
      this.$emit("drawerChanged", this.drawerIsShown);
    },
  },
};
</script>

<style>
</style>
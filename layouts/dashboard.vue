<template>
  <v-app :id="applicationId">
    <navigation-drawer
      v-model="drawerIsShown"
      @isShownChanged="changeNavigationDrawerShown"
    ></navigation-drawer>

    <application-bar
      :drawer-is-shown-prop="drawerIsShown"
      @drawerChanged="changeNavigationDrawerShown"
    ></application-bar>

    <v-main>
      <nuxt />
    </v-main>

    <footer-section></footer-section>

    <global-snackbar></global-snackbar>

    <!-- Right Drawer -->
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- END OF Right Drawer -->
  </v-app>
</template>

<script>
import ApplicationBar from "~/components/_dashboard/application-bar";
import NavigationDrawer from "~/components/_dashboard/navigation-drawer";
import FooterSection from "~/components/_dashboard/footer";

import GlobalSnackbar from "~/components/_support/global-snackbar";
export default {
  components: {
    ApplicationBar,
    NavigationDrawer,
    FooterSection,

    GlobalSnackbar,
  },

  data() {
    return {
      drawerIsShown: true,

      applicationId: process.env.APPLICATION_ID,
    };
  },

  mounted() {
    let vm = this;

    // Fill up required global variables.
    vm.$store.dispatch("fetchGlobalValues");
  },

  methods: {
    changeNavigationDrawerShown(isShown) {
      this.drawerIsShown = isShown;
    },
  },
};
</script>

<template>
  <v-app id="naval-nano-erp">
    <navigation-drawer
      v-model="drawerIsShown"
      @isShownChanged="changeNavigationDrawerShown"
    ></navigation-drawer>

    <application-bar
      :drawer-is-shown-prop="drawerIsShown"
      @drawerChanged="changeNavigationDrawerShown"
    ></application-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

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

    <footer></footer>
  </v-app>
</template>

<script>
import ApplicationBar from "~/components/_dashboard/application-bar";
import NavigationDrawer from "~/components/_dashboard/navigation-drawer";
import Footer from "~/components/_dashboard/footer";
export default {
  components: { ApplicationBar, NavigationDrawer, Footer },
  data() {
    return {
      drawerIsShown: true,
    };
  },
  methods: {
    changeNavigationDrawerShown(isShown) {
      this.drawerIsShown = isShown;
    },
  },
};
</script>

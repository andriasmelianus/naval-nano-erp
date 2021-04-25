<template>
  <v-navigation-drawer v-model="isShown" fixed app>
    <v-list>
      <v-list-item class="px-2 justify-center">
        <v-list-item-avatar size="80" :tile="true">
          <v-img
            src="https://cdn.worldvectorlogo.com/logos/viking-aviation.svg"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Company Name</v-list-item-title>
          <v-list-item-subtitle
            >Company brief description.</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            nuxt
            :to="child.to"
            exact
          >
            <v-list-item-content>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :key="item.title" nuxt :to="item.to" exact>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          nuxt
          to="/test"
          class="mb-2"
          v-if="environment != 'production'"
          color="yellow"
          >.: Test :.</v-btn
        >
        <v-btn block nuxt to="/logout" color="red lighten-1" class="white--text"
          >Logout</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { items } from "./data/navigation-drawer-default";
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShown: true,
      items: items,

      environment: process.env.NODE_ENV,
    };
  },

  watch: {
    value(newValue) {
      this.isShown = newValue;
      this.$emit("isShownChanged", newValue);
    },
    isShown(newValue) {
      this.$emit("isShownChanged", newValue);
    },
  },
};
</script>

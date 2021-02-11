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

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-exit-to-app",
          title: "Logout",
          to: "/logout",
        },
      ],
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

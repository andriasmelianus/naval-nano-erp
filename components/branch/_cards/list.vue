<template>
  <v-card class="mx-auto">
    <v-card-text>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt molestiae
      optio quo ea tempore veniam debitis deleniti, accusamus, ducimus magni
      error libero consectetur vero pariatur similique odit ad ullam eius?
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    branches: null,
  }),
  mounted() {
    let vm = this;
    vm.$axios
      .$get("/branch")
      .then(function (result) {
        vm.branches = result;
      })
      .catch(function (result) {
        console.log(result);
      });
  },
};
</script>
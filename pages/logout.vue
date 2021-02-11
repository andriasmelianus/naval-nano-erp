<template>
  <div>Proses logout...</div>
</template>

<script>
export default {
  beforeMount() {
    let vm = this;
    vm.$auth.logout().then(function (result) {
      vm.$router.push("/login");
    });
  },
};
</script>

<style>
</style>
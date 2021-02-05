<template></template>

<script>
export default {
  beforeMount() {
    this.$auth.logout();
  },
};
</script>

<style>
</style>
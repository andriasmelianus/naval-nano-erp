<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="n in 5" :key="n" @click="() => {}"
        >Menu {{ n }}</v-list-item
      >
    </v-list>
  </v-menu>
</template>

<script>
export default {};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <div class="text-center text-h4">
          <slot name="title"></slot>
        </div>
        <div class="text-center text-subtitle-1">
          <slot name="subtitle"></slot>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <slot
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          tempora libero quae dolorum, doloribus recusandae autem exercitationem
          sit quisquam laborum voluptatibus deserunt enim expedita quam eaque
          placeat, magni ducimus dolore!</slot
        >
        <br />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

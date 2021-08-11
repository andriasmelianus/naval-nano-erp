export const Handler = {
  props: {
    resourceUri: {
      type: String,
      required: true
    },

    id: {
      type: Number,
      required: true
    },

    width: {
      type: Number
    },

    height: {
      type: Number,
      default: 250
    }
  },

  data: () => ({
    source: undefined
  }),

  watch: {
    id(newId, oldId) {
      this.getImage();
    }
  },

  mounted() {
    this.getImage();
  },

  methods: {
    getImage() {
      let vm = this;
      vm.$axios
        .$get(vm.resourceUri + "/base64/" + vm.id, {
          params: {
            width: vm.width,
            height: vm.height
          }
        })
        .then(function(result) {
          vm.source = result;
        })
        .catch(function(result) {
          console.log(result);
        });
    }
  }
};

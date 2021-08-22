import { MessageExtractor } from "./message-extractor";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";
export const GlobalAutocompleteHandler = {
  mixins: [MessageExtractor, InvalidInputMessageHandler],

  props: {
    /**
     * Column to be displayed on the control.
     */
    searchColumn: {
      type: String,
      default: "name"
    },

    /**
     * Record to be selected in the begining.
     */
    record: {
      type: Object,
      default: function() {
        return {};
      }
    },

    /**
     * URI to fetch data for the autocomplete control.
     * The fourth segement or {?} in the given example of URI: /api/v1/user{?}
     * Default is: /autocomplete.
     */
    componentUri: {
      type: String,
      default: "/autocomplete"
    }
  },

  data: () => ({
    resourceUri: "",
    searchKeyword: "",
    serverParams: {},

    records: undefined,

    isLoading: false,
    dataFetchTimerId: null,
    dataFetchTimerDelay: 750
  }),

  computed: {
    resourceUriForAutocomplete() {
      return this.resourceUri + this.componentUri;
    }
  },

  watch: {
    /**
     * Emit the input event to provide v-model support.
     */
    searchKeyword(newValue, oldValue) {
      let vm = this;

      clearTimeout(vm.dataFetchTimerId);
      vm.dataFetchTimerId = setTimeout(function() {
        vm.serverParams = Object.assign({}, vm.serverParams, {
          // Request parameter name from variable/dynamic property name.
          [vm.searchColumn]: newValue
        });

        vm.$emit("keyword-changed", newValue);
      }, vm.dataFetchTimerDelay);
    },

    /**
     * Fetch the data when changed.
     */
    serverParams: {
      handler() {
        this.readRecords();
      },
      deep: true
    },

    record() {
      this.invalidInputMessageClear();
    },

    records() {
      this.invalidInputMessageClear();
    }
  },

  methods: {
    /**
     * Fetch data from API server with provided parameters from serverParams.
     * @return {void}
     */
    readRecords() {
      let vm = this;

      vm.isLoading = true;
      vm.$axios
        .$get(vm.resourceUriForAutocomplete, {
          params: vm.serverParams
        })
        .then(function(result) {
          vm.records = result;
          vm.isLoading = false;
        })
        .catch(function(result) {
          vm.isLoading = false;
          vm.invalidInputMessageExtract(result);
        });
    },

    /**
     * Catch selected item changed event.
     * @return {void}
     */
    handleChange(record) {
      this.$emit("selected-changed", record);
    }
  }
};

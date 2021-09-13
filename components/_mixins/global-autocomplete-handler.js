import { MessageExtractor } from "./message-extractor";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";
export const GlobalAutocompleteHandler = {
  mixins: [MessageExtractor, InvalidInputMessageHandler],

  props: {
    /**
     * Minimum characters typed to begin search operation.
     */
    minimumCharacters: {
      type: Number,
      default: 3
    },

    /**
     * Parameter name to send within request.
     */
    requestParameterName: {
      type: String,
      default: "searchKeyword"
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
    hintText() {
      return (
        "Ketik " + this.minimumCharacters + " karakter untuk mulai mencari"
      );
    },

    resourceUriForAutocomplete() {
      return this.resourceUri + this.componentUri;
    }
  },

  watch: {
    /**
     * Begin data search when keyword is typed.
     */
    searchKeyword(newValue, oldValue) {
      let vm = this;

      clearTimeout(vm.dataFetchTimerId);
      vm.dataFetchTimerId = setTimeout(function() {
        if (newValue != null) {
          if (newValue.length >= vm.minimumCharacters) {
            vm.serverParams = Object.assign({}, vm.serverParams, {
              [vm.requestParameterName]: newValue
            });
          }
        }
      }, vm.dataFetchTimerDelay);
    },

    /**
     * Fetch the data when changed.
     */
    serverParams: {
      handler() {
        this.records = [];
        this.clearInvalidInputMessage();

        this.readRecords();
      },
      deep: true
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
     * Clear extracted invalid input message from input control.
     * @return {void}
     */
    clearInvalidInputMessage() {
      let vm = this;
      vm.invalidInputMessage = Object.assign(
        {},
        vm.invalidInputMessage,
        vm.defaultInvalidInputMessage
      );
    },

    /**
     * Capture the selected item change from v-autocomplete control.
     * @return {void}
     */
    handleChange(selectedRecord) {
      this.$emit("selected-change", selectedRecord);
    }
  }
};

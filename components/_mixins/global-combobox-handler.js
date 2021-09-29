import { MessageExtractor } from "./message-extractor";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";
export const GlobalComboboxHandler = {
  mixins: [MessageExtractor, InvalidInputMessageHandler],

  props: {
    value: {
      type: [Object, String, Number]
    },

    /**
     * Minimum characters typed to begin search operation.
     */
    minimumCharacters: {
      type: Number,
      default: 3
    },

    /**
     * Value field of the selectedRecord object.
     */
    itemValue: {
      type: String,
      default: "id"
    },

    /**
     * Request parameter name for search keyword.
     */
    searchKeywordRequestParameterName: {
      type: String,
      default: "searchKeyword"
    },

    /**
     * URI to address the entity.
     * The third segment in the following URI: /api/v1{?}
     * Default value must be overrided in the handler.
     */
    resourceUri: {
      type: String,
      default: "/entity"
    },

    /**
     * URI to fetch data for the combobox control.
     * The fourth segement or {?} in the given example of URI: /api/v1/user{?}
     * Default is: /combobox.
     */
    componentUri: {
      type: String,
      default: "/combobox"
    }
  },

  data: vm => ({
    records: [],
    selectedRecord: undefined, // Set to component v-model.
    isSingleRecordSearch: false,

    searchKeyword: undefined,
    serverParams: {},
    isLoading: false,
    dataFetchTimerId: undefined,
    dataFetchTimerDelay: 600
  }),

  computed: {
    hintText() {
      return (
        "Ketik " + this.minimumCharacters + " karakter untuk mulai mencari"
      );
    },

    hideNoData() {
      return !this.searchKeyword;
    },

    resourceUriForCombobox() {
      return this.resourceUri + this.componentUri;
    }
  },

  watch: {
    value(newValue, oldValue) {
      this.handleValueChanged(newValue);
    },

    /**
     * Perform API request when search keyword is typed.
     */
    searchKeyword(newValue, oldValue) {
      let vm = this;

      if (newValue != null) {
        if (newValue.length >= vm.minimumCharacters) {
          vm.isSingleRecordSearch = false;
          vm.updateServerParams({
            [vm.searchKeywordRequestParameterName]: newValue
          });
        }
      } else {
        vm.selectedRecord = undefined;
      }
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
    },

    /**
     * Emit input event with the value.
     * @param {mixed} newValue New selected record
     * @param {mixed} oldValue Old selected record
     */
    selectedRecord(newValue, oldValue) {
      let vm = this;

      if (typeof newValue == "object") {
        vm.$emit("input", newValue[vm.itemValue]);
      } else {
        vm.$emit("input", newValue);
      }
    }
  },

  mounted() {
    this.handleValueChanged(this.value);
  },

  methods: {
    /**
     * Handle operation if value prop is updated/changed.
     * @param {mixed} newValue Value provided from v-model.
     */
    handleValueChanged(newValue) {
      let vm = this;

      if (newValue == undefined) {
        vm.selectedRecord = undefined;
      } else {
        if (typeof newValue == "object") {
          vm.selectedRecord = newValue;
        } else {
          vm.isSingleRecordSearch = true;
          vm.updateServerParams({
            [vm.itemValue]: newValue
          });
        }
      }
    },

    /**
     * Set the new value for server parameters.
     * @param {Object} params
     * @return {void}
     */
    updateServerParams(params) {
      let vm = this;

      clearTimeout(vm.dataFetchTimerId);
      vm.dataFetchTimerId = setTimeout(function() {
        vm.serverParams = Object.assign({}, params);
      }, vm.dataFetchTimerDelay);
    },

    /**
     * Fetch data from API server with provided parameters from serverParams.
     * @return {void}
     */
    readRecords() {
      let vm = this;

      vm.isLoading = true;
      vm.$axios
        .$get(vm.resourceUriForCombobox, {
          params: vm.serverParams
        })
        .then(function(result) {
          vm.records = result;
          vm.isLoading = false;

          /**
           * If user provide value for v-model, this component will search a single record that match the value in v-model.
           * Request will be sent with parameter defined in the props: itemValue.
           * If system found the record, it will assign the record as selectedRecord.
           */
          if (vm.records.length) {
            if (vm.isSingleRecordSearch) {
              // Identify whether the call is from v-model or searchKeyword change event.
              vm.selectedRecord = vm.records[0];
            }
          }
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
    }
  }
};

import { MessageExtractor } from "./message-extractor";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";

/**
 * This mixin can be used for autocomplete and combobox components.
 */
export const GlobalAutocompleteHandler = {
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
     * Return JavaScript object when true.
     */
    returnObject: {
      type: Boolean,
      default: false
    },

    /**
     * Value field of the selectedRecord object.
     */
    itemValue: {
      type: String,
      default: "id"
    },

    /**
     * Text field of the selectedRecord object.
     */
    itemText: {
      type: String,
      default: "name"
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
     * URI to fetch data for the autocomplete control.
     * The fourth segement or {?} in the given example of URI: /api/v1/user{?}
     * Default is: /autocomplete.
     */
    componentUri: {
      type: String,
      default: "/autocomplete"
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

    resourceUriForAutocomplete() {
      return this.resourceUri + this.componentUri;
    }
  },

  watch: {
    value(newValue, oldValue) {
      this.handleValueChanged(newValue);
    },

    /**
     * Emit input event with the value.
     * @param {mixed} newValue New selected record
     * @param {mixed} oldValue Old selected record
     */
    selectedRecord(newValue, oldValue) {
      let vm = this;
      if (typeof newValue == "object") {
        if (vm.returnObject) {
          // If the component is returning object.
          if (JSON.stringify(newValue) != JSON.stringify(vm.value)) {
            // Make sure component emits the different selectedRecord only.
            vm.$emit("input", newValue);
          }
        } else {
          // If the component is NOT returning object.
          if (vm.value != newValue[vm.itemValue]) {
            // Make sure component emits the different value from object.
            vm.$emit("input", newValue[vm.itemValue]);
          }
        }
      } else if (typeof newValue == "string" || typeof newValue == "number") {
        vm.$emit("input", newValue);
      }
    },

    /**
     * Perform API request when search keyword is typed.
     */
    searchKeyword(newValue, oldValue) {
      let vm = this;

      /**
       * Prevent performing unnecessary request if the this.selectedRecord[this.itemText]
       * has the same value with this.searchKeyword.
       */
      if (newValue != undefined) {
        if (newValue.length >= vm.minimumCharacters) {
          vm.isSingleRecordSearch = false; // Ensure the returned data is more than one.
          if (vm.selectedRecord == undefined) {
            // If there is no data selected.
            vm.updateServerParams({
              [vm.searchKeywordRequestParameterName]: newValue
            });
          } else {
            if (
              newValue != vm.selectedRecord[vm.itemValue] &&
              newValue != vm.selectedRecord[vm.itemText]
            ) {
              // If the selected data is NOT the same as typed.
              vm.updateServerParams({
                [vm.searchKeywordRequestParameterName]: newValue
              });
            }
          }
        }
      } else {
        vm.clear();
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

      if (newValue == undefined || newValue == "") {
        vm.clear();
      } else {
        if (typeof newValue == "object") {
          if (JSON.stringify(newValue) != JSON.stringify(vm.selectedRecord)) {
            // If new value is NOT the same with selectedRecord.
            vm.records = [newValue]; // Populate the items with new record.
            vm.selectedRecord = newValue; // Select the new record.
          }
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
        .$get(vm.resourceUriForAutocomplete, {
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

    clear() {
      let vm = this;

      vm.selectedRecord = undefined;
      vm.searchKeyword = undefined;
      vm.records = [];
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

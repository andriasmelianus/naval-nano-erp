import { TypeDetector } from "~/components/_mixins/type-detector";
const PROPERTY_VALUE = 1,
  PROPERTY_SELECTED_DATE = 2,
  PROPERTY_DATE_TEXT = 3;
export const Handler = {
  mixins: [TypeDetector],

  props: {
    label: {
      type: String,
      default: "Tanggal"
    },

    mask: {
      type: String,
      default: "##/##/####"
    },

    valueFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },

    textFormat: {
      type: String,
      default: "DD/MM/YYYY"
    },

    /**
     * Passed value must in ISO 8601 format.
     */
    value: {
      type: String

      /**
       * Setting the default value will display the default value even though initial value set to null/undefined.
       * Please set initial value within the record.js file. Using moment.js is recommended.
       * Disable default value also enable user to set the value to null/undefined when untouched.
       */
      // default: function () {
      //   return this.moment().format(this.valueFormat);
      // },
    }
  },

  data: vm => ({
    isShown: false, // Is the date picker shown?
    selectedDate: undefined,
    dateText: undefined,

    // Supporting data.
    isDirty: false, // To indicate that the value is modified.
    isSet: false // To indicate that the value has been set by one of watch property.
  }),

  watch: {
    value(newValue, oldValue) {
      let vm = this;

      if (vm.isUndefined(newValue)) {
        vm.resetState();
      } else {
        let dateValue = vm.$moment(newValue, vm.valueFormat);

        if (dateValue._isValid) {
          vm.setValue(newValue, PROPERTY_VALUE);
        } else {
          vm.resetState();
        }
      }
    },

    selectedDate(newSelectedDate, oldSelectedDate) {
      let vm = this;

      if (vm.isUndefined(newSelectedDate)) {
        vm.resetState();
      } else {
        let dateValue = vm.$moment(newSelectedDate, vm.valueFormat);

        if (dateValue._isValid) {
          vm.setValue(newSelectedDate, PROPERTY_SELECTED_DATE);
        } else {
          vm.resetState();
        }
      }
    },

    dateText(newDateText, oldDateText) {
      let vm = this;

      if (vm.isUndefined(newDateText)) {
        vm.resetState();
      } else {
        if (newDateText.length == 10) {
          let dateValue = vm.$moment(newDateText, vm.textFormat);

          if (dateValue._isValid) {
            vm.setValue(dateValue.format(vm.valueFormat), PROPERTY_DATE_TEXT);
          } else {
            vm.resetState();
          }
        } else if (newDateText.length == 0) {
          vm.resetState();
        } else {
          vm.isSet = false;
        }
      }
    }
  },

  mounted() {
    let vm = this;

    if (!vm.isUndefined(vm.value)) {
      let dateValue = vm.$moment(vm.value, vm.valueFormat);

      if (dateValue._isValid) {
        vm.setValue(vm.value, PROPERTY_VALUE);
      } else {
        vm.resetState();
      }
    }
  },

  methods: {
    /**
     * Centralize the value setting.
     * @param {String} theValue Date in valueFormat.
     * @param {Number} propertyOrigin The origin of property. See pre-declared constant variables.
     * @return {void}
     */
    setValue(theValue, propertyOrigin) {
      let vm = this;

      switch (propertyOrigin) {
        case PROPERTY_VALUE:
          vm.selectedDate = theValue;
          vm.dateText = vm
            .$moment(theValue, vm.valueFormat)
            .format(vm.textFormat);
          break;
        case PROPERTY_SELECTED_DATE:
          vm.dateText = vm
            .$moment(theValue, vm.valueFormat)
            .format(vm.textFormat);
          vm.$emit("input", theValue);
          break;
        case PROPERTY_DATE_TEXT:
          vm.selectedDate = theValue;
          vm.$emit("input", theValue);
          break;
      }

      vm.isDirty = true;
      vm.isSet = true;
    },

    /**
     * Handle lost focus event on v-text-field.
     * Revert to previous valid value if dateText is incomplete.
     * @return {void}
     */
    handleTextFieldBlur(e) {
      let vm = this;
      if (!vm.isUndefined(e.target.value)) {
        const dateTextLength = e.target.value.length;
        if (dateTextLength > 0 && dateTextLength < 10) {
          vm.setValue(vm.value, PROPERTY_VALUE);
        }
      }
    },

    /**
     * Clear all value from all property and set it to the default value.
     * @return {void}
     */
    resetState() {
      let vm = this;

      if (vm.isDirty) {
        vm.selectedDate = undefined;
        vm.dateText = undefined;
        vm.$emit("input", undefined);

        vm.isDirty = false;
        vm.isSet = false;
      }
    }
  }
};

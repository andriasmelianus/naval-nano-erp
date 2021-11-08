<template>
  <v-menu
    v-model="isShown"
    transition="scale-transition"
    min-width="auto"
    max-width="290px"
    :close-on-content-click="false"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateText"
        hint="YYYY/MM/DD"
        append-icon="mdi-calendar"
        :label="label"
        persistent-hint
        v-mask="mask"
        v-bind="$attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="selectedDate"
      no-title
      @input="isShown = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: "Tanggal",
    },

    mask: {
      type: String,
      default: "####/##/##",
    },

    /**
     * Passed value must in ISO 8601 format.
     */
    value: {
      type: String,
      default: function () {
        return new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10);
      },
    },
  },

  data: (vm) => ({
    isShown: false, // Is the date picker shown?
    selectedDate: vm.value,
    dateText: vm.formatDateToEasyToType(vm.value),
  }),

  watch: {
    value(newDate, oldDate) {
      let vm = this;

      vm.dateText = vm.formatDateToEasyToType(newDate);
      vm.selectedDate = vm.formatDateToIso8601(newDate);
    },

    selectedDate(newDate, oldDate) {
      let vm = this;

      vm.dateText = vm.formatDateToEasyToType(newDate);
      vm.$emit("input", newDate);
    },

    dateText(newDateText, oldDateText) {
      let vm = this;

      if (newDateText.length == 10) {
        let dateInIso8601Format = vm.formatDateToIso8601(
          newDateText.replaceAll("/", "-")
        );

        vm.selectedDate = dateInIso8601Format;
        vm.$emit("input", dateInIso8601Format);
      }
    },
  },

  methods: {
    /**
     * Extract the given date to ISO 8601 standards.
     * @param {String} date
     * @return {String}
     */
    formatDateToIso8601(date) {
      if (!date) {
        return null;
      }

      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },

    /**
     * Transform ISO 8601 formatted date to a format that easy to type.
     * Input: 2021-09-14
     * Output: 2021/09/14
     * @param {String} dateInIso8601Format
     * @return {String}
     */
    formatDateToEasyToType(dateInIso8601Format) {
      if (!dateInIso8601Format) {
        return null;
      }

      return dateInIso8601Format.replaceAll("-", "/");
    },
  },
};
</script>

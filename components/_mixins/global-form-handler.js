/**
 * Provide standard form handler. Including POST and PUT/PATCH operation.
 */
import { MessageExtractor } from "~/components/_mixins/message-extractor";
import { InvalidInputMessageHandler } from "./form/invalid-input-message-handler";
import { IdExtractor } from "./id-extractor";
export const GlobalFormHandler = {
  mixins: [MessageExtractor, InvalidInputMessageHandler, IdExtractor],

  props: {
    /**
     * Resource url to perform RESTful operation.
     * A value must be set for this data!
     */
    resourceUri: String,

    /**
     * Record to be processed with the form.
     */
    record: {
      type: Object,
      default: function() {
        return {};
      }
    },

    /**
     * Whether the form is on edit mode or not.
     * When the value is true, submitted form will make PUT request.
     * Otherwise POST request will be created.
     */
    editMode: {
      type: Boolean,
      default: false
    },

    /**
     * When a field contains multiple values (array of objects), it will converted to array of IDs.
     * Since the array can containing some objects, setting this props to true will cause
     * the form extract the identity value first from the object before sending to API server.
     */
    returnIdForMultipleValues: {
      type: Boolean,
      default: false
    },

    /**
     * The property name of an object considered as identity within multiple values.
     */
    idIndexWithinMultipleValues: {
      type: String,
      default: "id"
    }
  },

  watch: {
    /**
     * Reset invalid input message when record is changed.
     * @param {Object} newRecord newly record from reactivity.
     */
    record: {
      handler: function(newRecord) {
        this.invalidInputMessageClear();
      },
      deep: true // Since the passed record is possible to contains a nested object.
    }
  },

  methods: {
    /**
     * Submit the form.
     */
    submitForm() {
      this.invalidInputMessageClear();

      if (!this.editMode) {
        this.createRecord(this.record);
      } else {
        this.updateRecord(this.record);
      }
    },

    /**
     * Perform record sanitation mechanisms before sending to API server.
     * @param {Object} recordToBeSanitized Record to be sanitized before sent to API server.
     * @returns {Object}
     */
    sanitizeRecord(recordToBeSanitized) {
      let recordKeys = Object.keys(recordToBeSanitized),
        sanitizedRecord = recordToBeSanitized;

      // Loop to all of available properties in a record.
      for (let keyIndex = 0; keyIndex < recordKeys.length; keyIndex++) {
        const key = recordKeys[keyIndex];
        // Sanitation mechanisms should be performed within this looping scope.
        // Current property can be accessed by: recordToBeSanitized[key].

        // Sanitation #1: Convert array of objects to array of IDs for multiple values field.
        if (this.returnIdForMultipleValues) {
          if (typeof recordToBeSanitized[key] == "object") {
            sanitizedRecord[key] = this.extractIdsFromArray(
              recordToBeSanitized[key],
              this.idIndexWithinMultipleValues
            );
          }
        }
      }

      return sanitizedRecord;
    },

    /**
     * Send the POST request to the server.
     * @param {Object} newRecord The new record input by user
     */
    createRecord(newRecord) {
      let vm = this,
        sanitizedRecord = vm.sanitizeRecord(newRecord);

      vm.$axios
        .$post(vm.resourceUri, sanitizedRecord)
        .then(function(result) {
          vm.$emit("record-created", result);

          vm.$store.commit("global-snackbar/show", {
            color: "success",
            message: vm.messageSuccessExtract(result)
          });
        })
        .catch(function(result) {
          vm.invalidInputMessageExtract(result);
        });
    },

    /**
     * Send the PUT request to the server.
     * @param {Object} updatedRecord Record updated from user
     */
    updateRecord(updatedRecord) {
      let vm = this,
        sanitizedRecord = vm.sanitizeRecord(updatedRecord);

      vm.$axios
        .$put(vm.resourceUri + "/" + sanitizedRecord.id, sanitizedRecord)
        .then(function(result) {
          vm.$emit("record-updated", result);

          vm.$store.commit("global-snackbar/show", {
            color: "success",
            message: vm.messageSuccessExtract(result)
          });
        })
        .catch(function(result) {
          vm.invalidInputMessageExtract(result);
        });
    }
  }
};

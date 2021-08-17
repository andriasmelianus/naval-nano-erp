/**
 * Simplify gathering authenticated user data.
 */
export const UserData = {
  computed: {
    user_name() {
      return this.$auth.user.name;
    },

    user_image_id() {
      return this.$auth.user.image_id;
    },

    user_email() {
      return this.$auth.user.email;
    },

    user_phone() {
      return this.$auth.user.phone;
    },

    user_address() {
      return this.$auth.user.address;
    },

    user_city() {
      return this.$auth.user.city;
    },

    user_country() {
      return this.$auth.user.country;
    },

    user_postal_code() {
      return this.$auth.user.postal_code;
    },

    user_updated_at() {
      return this.$auth.user.updated_at;
    }
  }
};

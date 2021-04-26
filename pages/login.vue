<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title
              >Login - {{ this.APPLICATION_NAME }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-form @submit.prevent="submitLogin">
            <v-card-text>
              <v-text-field
                v-model="email"
                :error-messages="invalidInputMessage.email[0]"
                label="Email"
                name="email"
                prepend-icon="mdi-account-lock"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :error-messages="invalidInputMessage.password[0]"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>

              <v-checkbox
                v-model="remember"
                label="Ingat saya"
                color="primary"
              ></v-checkbox>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" type="submit">Masuk</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="default" v-show="false">
                <v-icon>mdi-account-circle</v-icon>&nbsp; Daftar...
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { InvalidInputMessageHandler } from "~/components/_mixins/form/invalid-input-message-handler";
import { MessageExtractor } from "~/components/_mixins/message-extractor";
export default {
  layout: "default",
  auth: "guest",
  head() {
    return {
      title: "Login",
    };
  },
  mixins: [InvalidInputMessageHandler, MessageExtractor],

  data: () => ({
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    email: "",
    password: "",
    remember: false,

    defaultInvalidInputMessage: {
      email: [],
      password: [],
    },
    invalidInputMessage: {
      email: [],
      password: [],
    },
  }),

  methods: {
    submitLogin: function () {
      let vm = this;
      vm.invalidInputMessageClear();

      vm.$auth
        .loginWith("laravelJWT", {
          data: {
            email: vm.email,
            password: vm.password,
            remember: vm.remember,
          },
        })
        .then(function (result) {
          vm.$store.dispatch("fetchCompany");
          vm.$store.dispatch("fetchBranch");

          // Show a success notification.
          vm.$store.commit("global-snackbar/show", {
            message:
              "Selamat datang! Anda dapat menekan tombol F11 kapan saja untuk beralih ke tampilan penuh (fullscreen).",
            color: "success",
          });
        })
        .catch(function (error) {
          vm.$store.commit("global-snackbar/show", {
            title: "Login Gagal",
            message: vm.messageErrorExtract(error),
            color: "error",
          });
          vm.invalidInputMessageExtract(error);
        });
    },
  },
};
</script>

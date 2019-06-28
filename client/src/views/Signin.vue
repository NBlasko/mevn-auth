<template>
  <section>
    <h1>Sign in with</h1>

    <div v-if="loggingIn">
      <img src="../assets/spinner.svg">
    </div>
    <div
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >{{errorMessage| filtermessage }}</div>

    <div class="container" v-if="!loggingIn">
      <div class="row">
        <div class="col-lg=3 col-md-2 col-sm-1 col-xs-12"></div>
        <div class="col-lg=6 col-md-8 col-sm-10 col-xs-12">
          <div class="btn-group d-flex align-items-start justify-content-around">
            <!--facebook button -->
            <facebook-component></facebook-component>

            <!--google+ button -->
            <google-component></google-component>
          </div>
          <form class="mt-2" @submit.prevent="signin()">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="user.email"
                type="text"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                required
              >
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="password"
                aria-describedby="passwordHelp"
                required
              >
            </div>
            <button type="submit" class="btn btn-primary">Signin</button>
          </form>
          <br>
          <div>
            Don’t have an account?
            <router-link to="/signup">Sign up</router-link>
          </div>
        </div>
        <div class="col-lg=3 col-md-2 col-sm-1 col-xs-12"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Joi from "joi";
import Vue from "vue";
// @ is an alias to /src
import FacebookComponent from "@/components/Facebook.vue";
import GoogleComponent from "@/components/Google.vue";
const { API_URL } = require("../constants.js");
const SIGNIN_URL = API_URL + "/signin";

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,30}$/)
    .required()
});

export default {
  components: {
    "google-component": GoogleComponent,
    "facebook-component": FacebookComponent
  },
  data: () => ({
    errorMessage: "",
    loggingIn: false,
    user: {
      email: "",
      password: ""
    }
  }),
  filters: {
    filtermessage: value => {
      if (value.includes("Unexpected token"))
        return "email and password do not match.";
      else return value;
    }
  },
  methods: {
    signin() {
      this.errorMessage = "";
      if (this.validUser()) {
        this.loggingIn = true;
        const body = {
          email: this.user.email,
          password: this.user.password
        };

        fetch(SIGNIN_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then(error => {
              throw new Error(error.message);
            });
          })
          .then(result => {
            localStorage.token = result.token;
            this.loggingIn = false;
            this.$router.push("/dashboard");
          })
          .catch(error => {
            this.loggingIn = false;
            this.errorMessage = error.message;
          });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      //  console.log(result);
      if (result.error === null) {
        return true;
      }

      if (result.error.message.includes("email")) {
        this.errorMessage = "email is invalid.";
        return false;
      }

      this.errorMessage = "Password is invalid.";
      return false;
    }
  }
};
</script>

<style>
h1 {
  text-align: center;
}

.social-btn {
  border-radius: 4px;
  font-size: 1.2em;
}
.social-btn span {
  float: left;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 5px;
}

.btn-primary {
  box-shadow: 1px 1px 1px grey;
}

.btn-primary:hover,
.social-btn:hover {
  box-shadow: 2px 2px 2px grey;
  opacity: 0.9;
  transform: translate(0px, -1px);
}
</style>

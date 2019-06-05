<template>
  <section>
    <h1>Signup</h1>

    <div v-if="signingUp">
      <img src="../assets/spinner.svg">
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class="container">
      <form v-if="!signingUp" @submit.prevent="signup">
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
        <div class="form-row">
          <div class="form-group col-md-6">
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
          <div class="form-group col-md-6">
            <label for="confirmPassword">Confirm Password</label>
            <input
              v-model="user.confirmPassword"
              type="password"
              class="form-control"
              id="confirmPassword"
              aria-describedby="confirmPasswordHelp"
              required
            >
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Signup</button>
      </form>
      <div class="mt-3">
        <router-link to="/signin">I am already a member</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import Joi from "joi";

const SIGNUP_URL = "http://localhost:3000/auth/signup";

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,30}$/)
    .required(),
  confirmPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{5,30}$/)
    .required()
});

export default {
  data: () => ({
    signingUp: false,
    errorMessage: "",
    user: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  methods: {
    signup() {
      this.errorMessage = "";
      if (this.validUser()) {
        const body = {
          email: this.user.email,
          password: this.user.password
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => {
            console.log(response);
            if (response.ok) {
              return response.json();
            }
            return response.json().then(error => {
              console.log("rr", error.error);
              throw new Error(error.error); //tako nekako, ali trebalo bi to bolje da sredim, glupo je error.error
            });
          })
          .then(result => {
            localStorage.token = result.token;
            this.signingUp = false;
            this.$router.push("/dashboard");
          })
          .catch(error => {
            console.log(error);
            this.signingUp = false;
            this.errorMessage = error.message;
          });
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = "Passwords must match.";
        return false;
      }

      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }

      if (result.error.message.includes("email")) {
        this.errorMessage = "email is invalid.";
      } else {
        this.errorMessage = "Password is invalid.";
      }

      return false;
    }
  }
};
</script>

<style>
</style>
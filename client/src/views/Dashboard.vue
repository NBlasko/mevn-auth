<template>
  <div>
    <h1>Dashboard</h1>
    <h2 class="my-3">Hello, {{this.name}}</h2>
    <button v-on:click="logout()" class="btn btn-primary">Logout</button>
  </div>
</template>

<script>
const { API_URL } = require("../constants.js");
const SECRET_URL = API_URL + "/secret";
export default {
  mounted() {
    fetch(SECRET_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      },
      cache: "no-store"
      // maybe there is a way to stop ajax if cached
    })
      .then(response => {
        //     console.log(response);
        if (response.ok) {
          return response.json();
        }
        return response.json().then(error => {
          throw new Error(error.error);
        });
      })
      .then(result => {
        // console.log("result", result);
        this.name = result.secret;
      })
      .catch(error => {
        // console.log("error", error);
        this.logout();
      });
  },
  data: () => ({
    name: ""
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/signin");
    }
  }
};
</script>

<style>
</style>

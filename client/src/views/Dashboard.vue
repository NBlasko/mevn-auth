<template>
  <div>
    <h1>Dashboard</h1>
    <h2 class="my-3">Hello, {{this.email}}</h2>
    <button v-on:click="logout()" class="btn btn-primary">Logout</button>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/auth/secret";
export default {
  mounted() {
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      },
      cache: "no-store" // maybe there is a way to stop ajax if cached
    })
      .then(res => res.json())
      .then(result => {
        if (result) {
          console.log(result);
          this.email = result.secret;
        } else {
          this.logout();
        }
      });
  },
  data: () => ({
    email: ""
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

<template>
  <!--google+ button -->
  <button class="ml-1 btn social-btn google-btn" @click="googlePlus">
    <img class="google-img" src="../assets/google.svg" alt="GOOGLE">
    <span>google</span>
  </button>
</template>

<script>
import Vue from "vue";
const { API_URL } = require("../constants.js");
const GOOGLE_URL = API_URL + "/google";

export default {
  methods: {
    googlePlus() {
      Vue.googleAuth().directAccess();
      Vue.googleAuth().signIn(authorizationCode => {
        // things to do when sign-in succeeds
        //      console.log('access_token', authorizationCode.Zi.access_token);
        // You can send the authorizationCode to your backend server for further processing, for example
        fetch(GOOGLE_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            access_token: authorizationCode.Zi.access_token
          })
        })
          .then(response => {
            if (response.ok) return response.json();
            return response.json().then(error => {
              throw new Error(error.message);
            });
          })
          .then(result => {
            localStorage.token = result.token;
            this.$router.push("/dashboard");
          })
          .catch(error => {
            // console.log("error", error);
          });
      });
    }
  }
};
</script>

<style>
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

.social-btn:hover {
  box-shadow: 2px 2px 2px grey;
  opacity: 0.9;
  transform: translate(0px, -1px);
}

.google-btn {
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  font-family: "Roboto", sans-serif;
}

.google-img {
  float: left;
  width: 40px;
  height: 40px;
  color: #fff;
}
</style>

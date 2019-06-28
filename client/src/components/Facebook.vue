<template>
  <!--facebook button -->
  <button type="button" class="mr-1 btn social-btn facebook-btn" @click="facebook">
    <img class="facebook-img" src="../assets/facebook.svg" alt="FACEBOOK">
    <span>facebook</span>
  </button>
</template>

<script>
import Vue from "vue";
const { API_URL } = require("../constants.js");
const FACEBOOK_URL = API_URL + "/facebook";

export default {
  methods: {
    facebook() {
      const fetchFacebook = response => {
        fetch(FACEBOOK_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            access_token: response.authResponse.accessToken
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
      };

      FB.getLoginStatus(response => {
        //  console.log("status", response.status);
        if (response.status === "connected") fetchFacebook(response);
        else
          FB.login(response => {
            //console.log("response face:", response);
            fetchFacebook(response);
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

.facebook-btn {
  background-color: #3b5998;
  color: #fff;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
}

.facebook-btn:hover {
  color: #fff;
}

.facebook-img {
  float: left;
  width: 40px;
  height: 40px;
  color: #fff;
}
</style>

<template>
  <section>
    <h1>Sign in with</h1>

    <div v-if="loggingIn">
      <img src="../assets/spinner.svg" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{errorMessage| filtermessage }}
    </div>

    <div class="container" v-if="!loggingIn">

      <div class="btn-group d-flex align-items-start justify-content-around">
        
        <!--facebook button -->
        <svg class="btn m-b-20" width="80px" viewBox="0 0 112.196 112.196">
          <g class="btn socialbutton" @click="facebook">
            <circle style="fill:#3B5998;" cx="56.098" cy="56.098" r="56.098" />
            <path style="fill:#FFFFFF;" d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
                  c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z" />
          </g>
        </svg>
        <!--google+ button -->
        <svg class="btn m-b-20" width="80px" viewBox="0 0 112.196 112.196">
          <g class="btn socialbutton" @click="googlePlus">
            <g>
              <circle id="XMLID_30_" style="fill:#DC4E41;" cx="56.098" cy="56.097" r="56.098" />
            </g>
            <g>
              <path style="fill:#DC4E41;" d="M19.531,58.608c-0.199,9.652,6.449,18.863,15.594,21.867c8.614,2.894,19.205,0.729,24.937-6.648
        			c4.185-5.169,5.136-12.06,4.683-18.498c-7.377-0.066-14.754-0.044-22.12-0.033c-0.012,2.628,0,5.246,0.011,7.874
        			c4.417,0.122,8.835,0.066,13.252,0.155c-1.115,3.821-3.655,7.377-7.51,8.757c-7.443,3.28-16.94-1.005-19.282-8.813
        			c-2.827-7.477,1.801-16.5,9.442-18.675c4.738-1.667,9.619,0.21,13.673,2.673c2.054-1.922,3.976-3.976,5.864-6.052
        			c-4.606-3.854-10.525-6.217-16.61-5.698C29.526,35.659,19.078,46.681,19.531,58.608z" />
              <path style="fill:#DC4E41;" d="M79.102,48.668c-0.022,2.198-0.045,4.407-0.056,6.604c-2.209,0.022-4.406,0.033-6.604,0.044
        			c0,2.198,0,4.384,0,6.582c2.198,0.011,4.407,0.022,6.604,0.045c0.022,2.198,0.022,4.395,0.044,6.604c2.187,0,4.385-0.011,6.582,0
        			c0.012-2.209,0.022-4.406,0.045-6.615c2.197-0.011,4.406-0.022,6.604-0.033c0-2.198,0-4.384,0-6.582
        			c-2.197-0.011-4.406-0.022-6.604-0.044c-0.012-2.198-0.033-4.407-0.045-6.604C83.475,48.668,81.288,48.668,79.102,48.668z" />
              <g>
                <path style="fill:#FFFFFF;" d="M19.531,58.608c-0.453-11.927,9.994-22.949,21.933-23.092c6.085-0.519,12.005,1.844,16.61,5.698
        				c-1.889,2.077-3.811,4.13-5.864,6.052c-4.054-2.463-8.935-4.34-13.673-2.673c-7.642,2.176-12.27,11.199-9.442,18.675
        				c2.342,7.808,11.839,12.093,19.282,8.813c3.854-1.38,6.395-4.936,7.51-8.757c-4.417-0.088-8.835-0.033-13.252-0.155
        				c-0.011-2.628-0.022-5.246-0.011-7.874c7.366-0.011,14.743-0.033,22.12,0.033c0.453,6.439-0.497,13.33-4.683,18.498
        				c-5.732,7.377-16.322,9.542-24.937,6.648C25.981,77.471,19.332,68.26,19.531,58.608z" />
                <path style="fill:#FFFFFF;" d="M79.102,48.668c2.187,0,4.373,0,6.57,0c0.012,2.198,0.033,4.407,0.045,6.604
        				c2.197,0.022,4.406,0.033,6.604,0.044c0,2.198,0,4.384,0,6.582c-2.197,0.011-4.406,0.022-6.604,0.033
        				c-0.022,2.209-0.033,4.406-0.045,6.615c-2.197-0.011-4.396,0-6.582,0c-0.021-2.209-0.021-4.406-0.044-6.604
        				c-2.197-0.023-4.406-0.033-6.604-0.045c0-2.198,0-4.384,0-6.582c2.198-0.011,4.396-0.022,6.604-0.044
        				C79.057,53.075,79.079,50.866,79.102,48.668z" />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <form @submit.prevent="signin()">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="user.email" type="text" class="form-control" id="email" aria-describedby="emailHelp" required>

        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" required>

        </div>
        <button type="submit" class="btn btn-primary">Signin</button>
      </form>
      <br>
      <div> Don’t have an account?
        <router-link to="/signup"> Sign up </router-link>
      </div>
    </div>

  </section>
</template>

<script>
import Joi from 'joi';
import Vue from 'vue'
const SIGNIN_URL = 'http://localhost:3000/auth/signin';
const GOOGLE_URL = 'http://localhost:3000/auth/google';
const FACEBOOK_URL = 'http://localhost:3000/auth/facebook';
const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(10).required()
});

export default {
  data: () => ({
    errorMessage: '',
    loggingIn: false,
    user: {
      email: '',
      password: '',
    },
  }),
  filters: {
    'filtermessage': (value) => {
      if (value.includes('Unexpected token'))
        return 'email and password do not match.';
      else return value;
    },
  },
  methods: {
    googlePlus() {
      this.errorMessage = '';
      Vue.googleAuth().directAccess();
      Vue.googleAuth().signIn((authorizationCode) => {
        // things to do when sign-in succeeds
        //      console.log('access_token', authorizationCode.Zi.access_token);
        // You can send the authorizationCode to your backend server for further processing, for example

        fetch(GOOGLE_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ access_token: authorizationCode.Zi.access_token })
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }).then((result) => {
            //       console.log("res", result)
            localStorage.token = result.token;
            this.$router.push('/dashboard');
          }).catch((error) => {
            //        console.log(error)
            this.errorMessage = error.message;
          })
      })
    },

    facebook() {
      this.errorMessage = '';
      FB.login((response) => {
        //     console.log(response);

        fetch(FACEBOOK_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ access_token: response.authResponse.accessToken })
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          }).then((result) => {
            //    console.log("res", result)
            localStorage.token = result.token;
            this.$router.push('/dashboard');
          }).catch((error) => {
            //       console.log(error)
            this.errorMessage = error.message;
          })
      });

    },


    signin() {
      this.errorMessage = '';
      if (this.validUser()) {
        this.loggingIn = true;
        const body = {
          email: this.user.email,
          password: this.user.password,
        };

        fetch(SIGNIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then((result) => {
          localStorage.token = result.token;
          this.loggingIn = false;
          this.$router.push('/dashboard');
        }).catch((error) => {
          this.loggingIn = false;
          this.errorMessage = error.message;
        });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      console.log(result)
      if (result.error === null) {
        return true;
      }

      if (result.error.message.includes('email')) {
        this.errorMessage = 'email is invalid.';
      } else {
        this.errorMessage = 'Password is invalid.';
      }

      return false;
    },
  }
};
</script>

<style>
h1 {
  text-align: center;
}

.socialbutton {
  width: 100px;
}

.socialbutton:hover {
  opacity: 0.9;
}

</style>
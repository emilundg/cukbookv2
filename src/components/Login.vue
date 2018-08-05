<template>
  <b-card class="mb-5" tag="article">
    <h3>Sign In</h3>
                  <b-form id="app" class="row" @submit="signIn" style="justify-content: center">
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <div class="inputfield">
                    <label for="email">Email:</label>
                    <b-form-input v-model="email"
                    type="text"
                    placeholder="Enter email" required></b-form-input>
                  </div>

                <div class="inputfield">
                    <label for="password">Password:</label>
                    <b-form-input v-model="password"
                    type="password"
                    placeholder="Enter password" required></b-form-input>
                  </div>
              </div>
    <button type="submit" class="button--regular">Sign in</button>

                  </b-form>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </b-card>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('main')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
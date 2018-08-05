import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFirestore from 'vue-firestore';
import Vue2TouchEvents from 'vue2-touch-events';
import router from './router';
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vue2TouchEvents);

Vue.use(VueFirestore);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

let app;
var config = {
  apiKey: "AIzaSyAyrkfsB8IPaRXu4mAKUhoUwwJ0Gr3hEKk",
  authDomain: "cuukbook.firebaseapp.com",
  databaseURL: "https://cuukbook.firebaseio.com",
  projectId: "cuukbook",
  storageBucket: "cuukbook.appspot.com",
  messagingSenderId: "278176339543"
};

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});
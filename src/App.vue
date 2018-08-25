<template>
  <div id="app">
    <div>
      <div class="App-logo" style="padding: 10px;">
        <div class="App-title">
          <h2>Le Cukbook</h2>
          <p>A simple collection of recipes</p>
        </div>
      </div>
      <b-navbar class="b-navbar" toggleable="md" type="light" variant="light" style="padding: 0px;">
        <b-navbar-toggle style="background: white; border-radius: 0px; border-top: 0px; border-bottom: 0px;" target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav style="margin: 0 auto; background: white;">
            <b-nav-item class="button" v-bind:active="tab === 1" v-on:click="tab = 1" href="#">Recipes</b-nav-item>
            <b-nav-item class="button" v-bind:active="tab === 2" v-on:click="tab = 2" href="#">Add Recipe</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-card v-if="tab === 1" tag="article" class="mb-5">
        <b-carousel id="carousel1" controls indicators :interval="0" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide class="carousel-slide" v-for="recipe in recipes" :key="recipe.id" v-touch:swipe.left="swipeHandlerLeft" v-touch:swipe.right="swipeHandlerRight">
            <div class="row">
              <div class="col-sm">
                <h2>{{recipe.title}}</h2>
                <p>Recipe by: {{recipe.author}}</p>
                <img alt="recipe-img" :src="recipe.imgSrc" />
                <p>{{recipe.description}}</p>
              </div>
              <div class="col-sm">
                <h3>Ingredients</h3>
                <ul style="columns: 2; padding: 0px;">
                  <li style="list-style: none;" v-for="ingredient in recipe.ingredients.split(',')" :key="ingredient.id">
                    {{ingredient}}
                  </li>
                </ul>
                <h3>How to</h3>
                <span>{{recipe.instructions}}</span>
              </div>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </b-card>

    </div>

    <b-container class="container-fluid" v-if="tab === 2" style="width: 85vw;" fluid>
      <b-form id="app" class="row" @submit="onSubmit">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div class="inputfield">
            <label for="comment">Title:</label>
            <b-form-input v-model="title" type="text" placeholder="Enter title" required></b-form-input>
          </div>

          <div class="inputfield">
            <label for="comment">Image:</label>
            <label @model="imgUrl" style="display: block;">
                          <div class="fileInput">
                                            <img style="height: 17px; float: right;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDA5cHgi%0D%0AIGhlaWdodD0iMzI3cHgiIHZpZXdCb3g9IjAgMCA0MDkgMzI3IiB2ZXJzaW9uPSIxLjEiIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MC4yICg1NTA0Nykg%0D%0ALSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+VXBs%0D%0Ab2FkPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRl%0D%0AZnM+PC9kZWZzPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRo%0D%0APSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJVcGxv%0D%0AYWQiIGZpbGw9IiMyMTkxRjUiPgogICAgICAgICAgICA8ZyBpZD0iVXBsb2FkLTIiPgogICAgICAg%0D%0AICAgICAgICAgPGcgaWQ9IlBhZ2UtMSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikljb25z%0D%0AIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTM5Ny4wMzQ2NjcsMzI2LjMzMTg5%0D%0AIEw4OC41NzYsMzI2LjMzMTg5IEMzOS42ODMyMjcxLDMyNi4zMDgzNzIgMC4wNDcwNzQ1MzUyLDI4%0D%0ANi42OTEzMTIgMCwyMzcuNzk4NTU2IEMwLjM3MDEwNjI3NiwyMzEuNzMxMTgxIDUuMzk4NjgwMTgs%0D%0AMjI3IDExLjQ3NzMzMzMsMjI3IEMxNy41NTU5ODY1LDIyNyAyMi41ODQ1NjA0LDIzMS43MzExODEg%0D%0AMjIuOTU0NjY2NywyMzcuNzk4NTU2IEMyMy4wMDE3MjI0LDI3NC4wMTM4MDEgNTIuMzYwNzMxOCwz%0D%0AMDMuMzUzNzIyIDg4LjU3NiwzMDMuMzc3MjIzIEwzMTkuNTU2NTc5LDMwMy4zNzcyMjMgQzM1NS43%0D%0ANDgyNiwzMDMuMzMwMTY3IDM4NS4wNjkwNzgsMjczLjk5MDI2IDM4NS4wOTI1NzksMjM3Ljc5ODU1%0D%0ANiBDMzg1LjQ2MjY4NSwyMzEuNzMxMTgxIDM5MC40OTEyNTksMjI3IDM5Ni41Njk5MTIsMjI3IEM0%0D%0AMDIuNjQ4NTY1LDIyNyA0MDcuNjc3MTM5LDIzMS43MzExODEgNDA4LjA0NzI0NiwyMzcuNzk4NTU2%0D%0AIEM0MDguMDExOTgzLDI4Ni42NjI4OTcgMzY4LjQyMDg5NywzMjYuMjczMDcyIDMxOS41NTY1Nzks%0D%0AMzI2LjMzMTg5IEwzOTcuMDM0NjY3LDMyNi4zMzE4OSBaIiBpZD0iVXBsb2FkLTIiIGZpbGwtcnVs%0D%0AZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTM1%0D%0ALjYxMzkzOSw5Ni43MDk4NDIxIEMxMzIuMjM1NzU0LDk4Ljk2OTg3NTQgMTI5LjUyOTk3NiwxMDAu%0D%0AMDk5ODkyIDEyNy40OTY2MDYsMTAwLjA5OTg5MiBDMTI0LjQ0NjU1LDEwMC4wOTk4OTIgMTIxLjUy%0D%0AMzM4NCw5OC44NzkwODc1IDExOS4zNzkyNzMsOTYuNzA5ODQyMSBDMTE3LjIxNjYxMiw5NC41NjY1%0D%0ANTA4IDExNiw5MS42NDc5NzQyIDExNiw4OC42MDMxNzU0IEMxMTYsODUuNTU4Mzc2NyAxMTcuMjE2%0D%0ANjEyLDgyLjYzOTgwMDEgMTE5LjM3OTI3Myw4MC40OTY1MDg4IEwxOTYuNDEzOTM5LDMuMzc2NTA4%0D%0ANzcgQzE5Ny4xNDQ1MSwyLjY0NzA0MTE2IDE5Ny45NzgzMDUsMi4wMjg4ODI5OSAxOTguODg4NjA2%0D%0ALDEuNTQxODQyMSBDMjAzLjc2MDg4OSwtMS4yODQ4OTUyMSAyMDkuOTY2ODEyLC0wLjEzNDMwODA2%0D%0AMyAyMTMuNTAxOTM5LDQuMjUxMTc1NDQgTDI4OS43NDcyNzMsODAuNDk2NTA4OCBDMjkzLjc5NTQy%0D%0ALDg1LjA1MTM1MjQgMjkzLjU4NzE5OSw5MS45NzMzNTA1IDI4OS4yNzI1OTEsOTYuMjc2NjM0MiBD%0D%0AMjg0Ljk1Nzk4MywxMDAuNTc5OTE4IDI3OC4wMzU0NjEsMTAwLjc2OTk0NiAyNzMuNDkxMjczLDk2%0D%0ALjcwOTg0MjEgTDIxNi4wODMyNzMsMzkuMzAxODQyMSBMMjE2LjA4MzI3MywyMTUuNTMzOTQ3IEMy%0D%0AMTYuMDcxNjUsMjIxLjg2MzAzNCAyMTAuOTU2MjczLDIyNi45OTc0NjIgMjA0LjYyNzI3MywyMjcu%0D%0AMDMyNjEzIEMxOTguMjgxNjA0LDIyNy4wMjA4NzMgMTkzLjE0MDM0NiwyMjEuODc5NjE2IDE5My4x%0D%0AMjg2MDYsMjE1LjUzMzk0NyBMMTkzLjEyODYwNiwzOS4xMDk4NDIxIEwxMzUuNjEzOTM5LDk2Ljcw%0D%0AOTg0MjEgWiIgaWQ9IlVwbG9hZC0yLXBhdGgiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8%0D%0AL2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAg%0D%0AICA8L2c+Cjwvc3ZnPg=="/>
                                            <span v-if="!imgUrl.name">
                                              Select File
                                            </span>
                                            <span @model="imgUrl" v-else style="float: left;">
                                              <p style="max-width: 425px; overflow: hidden;">
                                                {{imgUrl.name}}
                                              </p>
                                            </span>
                                        <b-form-file
                                        :state="Boolean(file)"
                                        type="file" @change="manageUpload"
                                        v-model="imgUrl"
                                        accept="image/jpeg, image/png"
                                        plain
                                        required>
                                        </b-form-file>
                    </div>
                  </label>
          </div>

          <div class="inputfield">
            <label for="comment">Short Description:</label>
            <b-form-input v-model="description" type="text" placeholder="Enter short description" required></b-form-input>
          </div>

          <div class="inputfield">
            <label for="comment">Author/Name:</label>
            <b-form-input v-model="author" type="text" placeholder="Enter author/name" required></b-form-input>
          </div>

        </div>

        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div class="form-group">
            <label for="comment">Ingredients:</label>
            <textarea class="form-control" rows="5" id="comment" v-model="ingredients" required placeholder="Lök, Ostron, Oumph.."></textarea>
          </div>

          <div class="form-group">
            <label for="comment">Instructions:</label>
            <textarea class="form-control" rows="5" id="comment" v-model="instructions" required placeholder="Först hackar man löken sen.."></textarea>
          </div>
        </div>
        <button type="submit" class="submit">
                                      Submit
                                    </button>
      </b-form>
      <dot-loader :loading="loading" :color="color"></dot-loader>
    </b-container>
  </div>
</template>

<script>
  import Firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/storage'
  import DotLoader from 'vue-spinner/src/DotLoader.vue'

  var config = {
    apiKey: "AIzaSyAyrkfsB8IPaRXu4mAKUhoUwwJ0Gr3hEKk",
    authDomain: "cuukbook.firebaseapp.com",
    databaseURL: "https://cuukbook.firebaseio.com",
    projectId: "cuukbook",
    storageBucket: "cuukbook.appspot.com",
    messagingSenderId: "278176339543"
  };

  export default {
    name: 'app',
    components: {
      'DotLoader': DotLoader
    },
    data() {
      return {
        file: null,
        color: "rgba(33, 147, 245, 0.5)",
        errors: [],
        slide: 0,
        loading: false,
        sliding: null,
        recipes: [],
        tab: 1,
        ingredients: '',
        instructions: '',
        title: '',
        imgUrl: '',
        description: '',
        author: ''
      }
    },
    created() {
      if (!Firebase.apps.length) {
        Firebase.initializeApp(config)
      }

      Firebase.firestore().settings({
        timestampsInSnapshots: true
      });

      this.$binding("recipes", Firebase.firestore().collection("recipes"))
        .then((recipes) => {
          this.recipes = recipes
        })
    },
    methods: {
      manageUpload(event) {
        this.imgUrl = event.target.files[0];
      },
      swipeHandlerLeft() {
        document.getElementsByClassName('carousel-control-next')[0].click();
      },
      swipeHandlerRight() {
        document.getElementsByClassName('carousel-control-prev')[0].click();
      },
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      onSubmit(e) {
        this.loading = true;
        // Add a new document with a generated id.
        e.preventDefault();
        const collectionRef = Firebase.firestore().collection("recipes");
        var storageRef = Firebase.storage().ref();
        var ref = storageRef.child(this.imgUrl.name);
        var self = this;
        ref.put(this.imgUrl).then(function(snapshot) {
          ref.getDownloadURL().then(function(url) {
            collectionRef
              .add({
                description: self.description,
                imgSrc: url,
                ingredients: self.ingredients,
                instructions: self.instructions,
                title: self.title,
                author: self.author
              })
              .then(function() {
                window
                  .location
                  .reload();
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });

          })
        });
      }
    }
  }
</script>

<style lang="scss">
  .v-spinner {
    position: absolute;
    top: 50vh;
    left: 47.5vw;
  }

  .submit {
    max-width: 200px;
    text-align: center;
    display: block;
    margin: 30px auto;
    height: 38px;
    padding: 0 30px;
    line-height: 38px;
    text-transform: uppercase;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    cursor: pointer;
    letter-spacing: 0.1rem;
    transition: all ease-in 0.2s;
    color: rgba(0, 0, 0, 0.87);
    outline: none;
    &:focus {
      outline: none;
    }
    &:hover {
      border-color: rgb(134, 134, 134);
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .carousel-inner {
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  .container-fluid {
    margin: 30px auto;
    width: 65vw;
    >.row {
      margin: 15px !important;
    }
  }

  .App-logo {
    background-image: url(https://github.com/emilundg/cukbookv2/blob/master/header-inTheKitchen1.jpg?raw=true);
    height: 100px;
    box-shadow: inset 0 -10px 40px rgba(0, 0, 0, 0.5);
    >.App-title {
      color: rgba(255, 255, 255, 0.87);
    }
}

.carousel-caption {
  color:#2c3e50 !important;
  position: static;
  outline: none;
}

.carousel-slide {
  outline: none;
  background: white;
  margin-bottom: 20px;

  img {
    max-height: auto;
    width: 30vw;
    min-width: 260px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    }
    
    img,
    h3 {
      margin-bottom: 2vh;
    }
    span {
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .carousel-indicators {
    margin-top: 30px;
    li {
      background: rgba(0, 0, 0, 0.2);
      &.active {
        background: rgba(0, 0, 0, 0.45);
      }
    }
  }

  .carousel-control-next {
    float: right;
  }

  .carousel-control-next,
  .carousel-control-prev {
    width: 7%;
  }

  .carousel-control-next-icon {
    background-image: url('./assets/next_icon.svg')!important;
  }

  .carousel-control-prev-icon {
    background-image: url('./assets/prev_icon.svg')!important;
  }

  .b-navbar {
    background: repeating-linear-gradient(135deg, #d9d9d9, #d9d9d9 .05em/* black stripe */
    , white 0, white 1.5em/* blue stripe */
    );
    border: 1px solid #d9d9d9;
    ul {
      li:nth-child(1) {
        border-left: 1px solid #d9d9d9;
      }
    }
    .button {
      border-right: 1px solid #d9d9d9;
      margin: 0;
      &:hover {
        background: rgba(45, 183, 245, 0.07);
      }
    }
  }

  .card {
    border: none;
    border-radius: 0px;
    margin: 5vh;
    box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    width: 85vw;
    margin: 30px auto;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  .fileInput {
    max-height: 38px;
    overflow: hidden;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ced4da;
    padding: .375rem .75rem;
  }

  input[type="file"] {
    display: none;
  }

  .inputfield,
  .form-group {
    text-align: left;
    margin-bottom: 30px;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
.v-spinner {
  position: absolute;
  top: 50vh;
  left: 47.5vw;

}

.button--regular{
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
    color: rgba(0,0,0, 0.87);
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
  > .row {
    margin: 15px !important;
  }
}

.App-logo {
    background-image: url(https://github.com/emilundg/cukbook/blob/master/src/header-inTheKitchen1.jpg?raw=true);
    height: 100px;
    box-shadow: inset 0 -10px 40px rgba(0,0,0,0.5);
    > .App-title {
      color: rgba(255,255,255, 0.87);
    }
}

.b-navbar {
    background: repeating-linear-gradient(135deg, #d9d9d9, #d9d9d9 .05em /* black stripe */, white 0,white 1.5em /* blue stripe */ );
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
        background: rgba(45,183,245, 0.07);
      }
    }
}

.card {
  border: none;
  border-radius: 0px;
  margin: 5vh;
  box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0,0,0,0.08);
  width: 85vw;
  margin: 30px auto;
}

h1, h2 {
  font-weight: normal;
}

.inputfield, .form-group {
  text-align: left;
  margin-bottom: 30px;
}

</style>
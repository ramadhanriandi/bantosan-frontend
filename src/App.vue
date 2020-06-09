<template>
  <div id="app">
    <Navbar :user="user" />
    <div class="container d-flex h-100 justify-content-center py-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        username: 'your_username',
        role: 'User',
      },
    };
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');
@import '@/assets/scss/color.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $BLACK;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}

.border-wrapper {
  border-radius: 14px;
}

.border-wrapper, .form-control {
  border: 1px solid $LIGHT_GREY;
}

.btn {
  font-size: 12px;
  font-weight: 500;
  height: 38px;
}

.btn-sm {
  border: none;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 700;
  height: 28px;
}

.btn-red, .btn-red:hover {
  background: $RED;
  color: $WHITE;
}

.btn-purple, .btn-purple:hover {
  background: $PURPLE;
  color: $WHITE;
}

.btn-red-reverse, .btn-red-reverse:hover {
  background: $LIGHT_RED;
  color: $RED;
}

.btn-purple-reverse, .btn-purple-reverse:hover {
  background: $LIGHT_PURPLE;
  color: $PURPLE;
}

.footer-note, .subtitle {
  color: $GREY;
}

.footer-redirect, .footer-redirect:hover {
  color: $PURPLE;
  font-weight: 500;
  text-decoration: none;
}

.form-control {
  font-size: 12px;
}

.form-control::placeholder {
  color: $LIGHT_GREY;
  font-size: 12px;
}

.form-text {
  color: $RED;
}

.subtitle {
  font-size: 10px;
}

.subtitle, .title {
  text-align: left;
}

.title {
  font-size: 24px;
  font-weight: 500;
}
</style>

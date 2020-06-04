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
</style>

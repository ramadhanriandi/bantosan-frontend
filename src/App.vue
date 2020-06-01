<template>
  <div id="app">
    <Navbar :activeMenu="active_menu" :user="user" />
    <router-view/>
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
      active_menu: 'disasters',
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

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}
</style>

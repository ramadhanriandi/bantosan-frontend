<template>
  <div id="app">
    <Navbar />
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

a, a:hover {
  text-decoration: none;
}

label {
  color: $GREY;
}

th {
  color: $GREY;
  font-weight: 500;
  font-size: 12px;
}

.border-wrapper {
  border-radius: 14px;
}

.border-wrapper, .form-control {
  border: 1px solid $LIGHT_GREY;
}

.btn, .btn:hover {
  font-size: 12px;
  font-weight: 500;
  height: 34px;
}

.btn-sm, .btn-sm:hover {
  border: none;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 700;
  height: 28px;
}

.btn-xs, .btn-xs:hover {
  border-radius: 7px;
  font-size: 10px;
  border: none;
  cursor: pointer;
}

.btn-red, .btn-red:hover {
  background: $RED;
  color: $WHITE;
}

.btn-yellow, .btn-yellow:hover {
  background: $YELLOW;
  color: $WHITE;
}

.btn-green, .btn-green:hover {
  background: $GREEN;
  color: $WHITE;
}

.btn-purple, .btn-purple:hover {
  background: $PURPLE;
  color: $WHITE;
}

.btn-light-grey, .btn-light-grey:hover {
  background: $LIGHT_GREY;
  color: $WHITE;
}

.btn-grey, .btn-grey:hover {
  background: $GREY;
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

.btn-grey-reverse, .btn-grey-reverse:hover {
  background: $WHITE;
  color: $GREY;
}

.btn-purple-outline, .btn-purple-outline:hover {
  border: 1px solid $PURPLE;
}

.btn-grey-outline, .btn-grey-outline:hover {
  border: 1px solid $GREY;
}

.cursor-pointer {
  cursor: pointer;
}

.empty-note {
  color: $LIGHT_GREY;
  font-size: 24px;
  margin-top: 100px;
}

.filter {
  border: 1px solid $GREY;
  border-radius: 5px;
  background: none;
  color: $GREY;
  font-size: 12px;
  font-weight: 500;
  height: 34px;
  outline: none;
  padding: auto;
  cursor: pointer;
}

.filter-active {
  border-color: $PURPLE !important;
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

.form-check-label {
  color: $BLACK;
}

.form-control, .input-group-text {
  font-size: 12px;
}

.form-control::placeholder {
  color: $LIGHT_GREY;
  font-size: 12px;
}

.form-text {
  color: $RED;
}

.pagination-link, .pagination-link:focus {
  border: 1px solid $GREY;
  border-radius: 5px;
  background: none;
  color: $GREY;
  font-size: 12px;
  font-weight: 500;
  height: 34px;
  width: 34px;
  margin: 0 0 0 5px;
  outline: none;
}

.pagination-link--active, .pagination-link--active:focus {
  border-color: $PURPLE;
  background: $LIGHT_PURPLE;
  color: $PURPLE;
}

.pagination-link--disable, .pagination-link--disable:focus {
  border-color: $LIGHT_GREY;
  color: $LIGHT_GREY;
}

.subtitle {
  font-size: 10px;
}

.subtitle, .title {
  text-align: left;
}

.text-red {
  color: $RED;
}

.text-yellow {
  color: $YELLOW;
}

.text-green {
  color: $GREEN;
}

.text-grey {
  color: $GREY;
}

.title {
  font-size: 24px;
  font-weight: 500;
}
</style>

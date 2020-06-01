<template>
  <nav class="navbar navbar-expand-lg navbar-light px-3">
    <router-link class="navbar-brand mx-5" to="/">bantosan</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-toggler-items"
      aria-controls="navbar-toggler-items"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar-toggler-items">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item mx-5 my-2" to="/disasters">
          Disasters
        </router-link>
        <router-link class="nav-item mx-5 my-2" to="/fundraisings">
          Fundraisings
        </router-link>
      </ul>
      <div class="">
        <router-link to="/login">
          <button class="btn mx-5 my-2">Login</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    activeMenu: String,
    user: Object,
  },
};
</script>

<style scoped lang="scss">
nav {
  border-bottom: 1px solid #BFBFBF;
  height: 80px;
}

.active {
  font-weight: 500;
}

.btn {
  background: #630FD1;
  color: white;
  height: 36px;
  font-size: 12px;
  font-weight: 500;
}

.nav-item {
  color: #333333;
  font-size: 14px;
}

.nav-item:hover {
  text-decoration: none;
}

.navbar-brand, .navbar-brand:focus, .navbar-brand:hover {
  color: #FF6565;
  font-size: 24px;
  font-weight: 700;
}

#navbar-toggler-items {
  background: white;
  text-align: right;
}
</style>

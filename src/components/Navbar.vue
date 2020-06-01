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
      <div class="nav-item dropdown">
        <div
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img class="img-avatar" src="@/assets/img/small-avatar.png" />
          your_username
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <div class="dropdown-header">Menus</div>
          <router-link class="dropdown-item" to="/reported-disaster">
            <img class="img-menu" src="@/assets/img/menu-disaster.png" />
            Reported Disaster
          </router-link>
          <router-link class="dropdown-item" to="/your-fundraising">
            <img class="img-menu" src="@/assets/img/menu-fundraising.png" />
            Your Fundraising
          </router-link>
          <!-- <router-link class="dropdown-item" to="/users">
            <img class="img-menu" src="@/assets/img/menu-user.png" />
            User List
          </router-link> -->
          <router-link class="dropdown-item" to="/donation-history">
            <img class="img-menu" src="@/assets/img/menu-donation.png" />
            Donation History
          </router-link>
          <div class="dropdown-divider"></div>
          <div class="dropdown-header">Account</div>
          <router-link class="dropdown-item" to="/profile">
            <img class="img-menu" src="@/assets/img/menu-profile.png" />
            Profile
          </router-link>
          <router-link class="dropdown-item" to="/change-password">
            <img class="img-menu" src="@/assets/img/menu-password.png" />
            Change Password
          </router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" to="/login">
            <img class="img-menu" src="@/assets/img/menu-logout.png" />
            Logout
          </router-link>
        </div>
      </div>
      <!-- <router-link to="/login">
        <button class="btn mx-5 my-2">Login</button>
      </router-link> -->
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

.dropdown-header {
  color: #BFBFBF;
  font-size: 10px;
}

.dropdown-item {
  font-size: 12px;
}

.dropdown-item, .nav-item {
  color: #333333;
}

.img-avatar {
  height: 36px;
  margin-right: 12px;
}

.img-menu {
  height: 20px;
  margin-right: 8px;
}

.nav-item {
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

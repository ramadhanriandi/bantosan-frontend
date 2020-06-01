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
        <router-link
          class="nav-item mx-5 my-2"
          :class="{ active: activeMenu === 'disasters' }"
          @click="activeMenu = 'disasters'"
          to="/disasters"
        >
          Disasters
        </router-link>
        <router-link
          class="nav-item mx-5 my-2"
          :class="{ active: activeMenu === 'fundraisings' }"
          @click="activeMenu = 'fundraisings'"
          to="/fundraisings"
        >
          Fundraisings
        </router-link>
      </ul>
      <div v-if="user && user.username" class="nav-item dropdown">
        <div
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img class="img-avatar" src="@/assets/img/small-avatar.png" />
          {{ user.username }}
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <div class="dropdown-header">Menus</div>
          <div v-for="(menu, idx) in dropdown.menus[`${user.role.toLowerCase()}`]" :key="idx">
            <router-link class="dropdown-item" :to="menu.link">
              <img class="img-menu" :src="require('@/assets/img/' + menu.img)" />
              {{ menu.name }}
            </router-link>
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-header">Account</div>
          <div v-for="(menu, idx) in dropdown.account" :key="idx">
            <router-link class="dropdown-item" :to="menu.link">
              <img class="img-menu" :src="require('@/assets/img/' + menu.img)" />
              {{ menu.name }}
            </router-link>
          </div>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" :to="dropdown.logout.link">
            <img class="img-menu" :src="require('@/assets/img/' + dropdown.logout.img)" />
            {{ dropdown.logout.name }}
          </router-link>
        </div>
      </div>
      <router-link v-else to="/login">
        <button class="btn mx-5 my-2">Login</button>
      </router-link>
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
  data() {
    return {
      dropdown: {
        menus: {
          admin: [
            { name: 'Reported Disaster', img: 'menu-disaster.png', link: '/reported-disaster' },
            { name: 'Fundraising List', img: 'menu-fundraising.png', link: '/fundraising-list' },
            { name: 'User List', img: 'menu-user.png', link: '/user-list' },
          ],
          user: [
            { name: 'Reported Disaster', img: 'menu-disaster.png', link: '/reported-disaster' },
            { name: 'Your Fundraising', img: 'menu-fundraising.png', link: '/your-fundraising' },
            { name: 'Donation History', img: 'menu-donation.png', link: '/donation-history' },
          ],
        },
        account: [
          { name: 'Profile', img: 'menu-profile.png', link: '/profile' },
          { name: 'Change Password', img: 'menu-password.png', link: '/change-password' },
        ],
        logout: { name: 'Logout', img: 'menu-logout.png', link: '/login' },
      },
    };
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

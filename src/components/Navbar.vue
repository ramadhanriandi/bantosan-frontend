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
          :class="{ active: getActiveMenu === 'disasters' }"
          to="/disasters"
        >
          Disasters
        </router-link>
        <router-link
          class="nav-item mx-5 my-2"
          :class="{ active: getActiveMenu === 'fundraisings' }"
          to="/fundraisings"
        >
          Fundraisings
        </router-link>
      </ul>
      <div v-if="getUser && getUser.username" class="nav-item dropdown">
        <div
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img class="img-avatar" src="@/assets/img/small-avatar.png" />
          {{ getUser.username }}
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <div class="dropdown-header">Menus</div>
          <div v-for="menu in dropdown.menus[`${getUser.role.toLowerCase()}`]" :key="menu.name">
            <router-link class="dropdown-item" :to="menu.link">
              <img class="img-menu" :src="require('@/assets/img/' + menu.img)" />
              {{ menu.name }}
            </router-link>
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-header">Account</div>
          <div v-for="menu in dropdown.account" :key="menu.name">
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
        <button class="btn btn-purple mx-5 my-2">Login</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    getActiveMenu() {
      return this.$route.path.split('/')[1];
    },
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      dropdown: {
        menus: {
          admin: [
            { name: 'Reported Disaster', img: 'menu-disaster.png', link: '/reported-disasters' },
            { name: 'Fundraising List', img: 'menu-fundraising.png', link: '/fundraising-list' },
            { name: 'User List', img: 'menu-user.png', link: '/user-list' },
          ],
          user: [
            { name: 'Reported Disaster', img: 'menu-disaster.png', link: '/reported-disasters' },
            { name: 'Your Fundraising', img: 'menu-fundraising.png', link: '/fundraising-list' },
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
@import '@/assets/scss/color.scss';

nav {
  border-bottom: 1px solid $LIGHT_GREY;
  height: 80px;
}

.active {
  font-weight: 500;
}

.dropdown-header {
  color: $LIGHT_GREY;
  font-size: 10px;
}

.dropdown-item {
  font-size: 12px;
}

.dropdown-item, .nav-item {
  color: $BLACK;
}

.img-avatar {
  height: 36px;
  margin-right: 12px;
}

.img-menu {
  height: 20px;
  margin-right: 8px;
}

.nav-item, .nav-item:hover {
  font-size: 14px;
  text-decoration: none;
}

.navbar-brand, .navbar-brand:focus, .navbar-brand:hover {
  color: $RED;
  font-size: 24px;
  font-weight: 700;
}

#navbar-toggler-items {
  background: $WHITE;
  text-align: right;
}
</style>

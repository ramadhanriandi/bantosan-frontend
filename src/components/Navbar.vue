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
      <div v-if="getCurrentUser && getCurrentUser.username" class="nav-item dropdown">
        <div
          class="nav-link dropdown-toggle nav-avatar"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div class="img-avatar">
            <img
              :src="`http://localhost:5000/images/${user.avatar ? user.avatar : 'small-avatar.png'}`"
            />
          </div>
          {{ getCurrentUser.username }}
        </div>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <div class="dropdown-header">Menus</div>
          <div
            v-for="menu in dropdown.menus[`${getDropdownMenu}`]"
            :key="menu.name"
          >
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
          <div class="dropdown-item" @click.prevent="logOut">
            <img class="img-menu" :src="require('@/assets/img/' + dropdown.logout.img)" />
            {{ dropdown.logout.name }}
          </div>
        </div>
      </div>
      <router-link v-else to="/login">
        <button class="btn btn-purple mx-5 my-2">Login</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
import AuthService from '../services/auth.service';

export default {
  name: 'Navbar',
  computed: {
    getActiveMenu() {
      return this.$route.path.split('/')[1];
    },
    getCurrentUser() {
      return this.$store.state.auth.user;
    },
    getDropdownMenu() {
      return this.getCurrentUser.roles.includes('ROLE_ADMIN') ? 'admin' : 'user';
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  data: () => ({
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
    user: {
      avatar: null,
    },
  }),
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.go('/');
    },
  },
  mounted() {
    if (this.$store.state.auth.user) {
      AuthService.getUserById(this.$store.state.auth.user.id).then(
        (response) => {
          this.user = response.data.value;
        },
        (error) => {
          this.errorMessage = error.response.data.errorMessage
              || error.response.data.status;
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.errorMessage,
          });
        },
      );
    }
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

.dropdown-item, .dropdown-item:active {
  background: none;
  font-size: 12px;
}

.dropdown-item, .nav-item {
  color: $BLACK;
}

.dropdown-item:hover {
  cursor: pointer;
}

.img-avatar {
  border-radius: 50%;
  display: inline-block;
  margin-right: 12px;
  max-height: 36px;
  max-width: 36px;
  overflow: hidden;
  position: relative;
}

.img-avatar {
  height: 100%;
  width: auto;
}

.img-menu {
  height: 20px;
  margin-right: 8px;
}

.nav-avatar {
  display: flex;
  align-items: center;
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

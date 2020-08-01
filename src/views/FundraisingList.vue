<template>
  <div class="w-100">
    <div class="d-flex align-items-center mb-4 row">
      <div class="col-12 col-sm-12 col-lg-6">
        <h2 class="title mb-4 mb-sm-4 mb-lg-0">Let’s Donate and Help Each Other</h2>
      </div>
      <div class="col-12 col-sm-12 col-lg-6">
        <div class="row px-3">
          <div class="col form-group mb-0 p-0">
            <input
              type="text"
              class="form-control p-3"
              placeholder="Search"
              v-model="searchName"
            />
          </div>
          <router-link
            class="ml-3 d-flex align-items-center"
            :to="loggedIn ? '/fundraising-list/create' : '/login'"
          >
            <button class="btn btn-purple-reverse col px-3">Create a fundraising</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="fundraisings.length > 0">
      <div class="row">
        <div
          class="col-6 col-sm-6 col-lg-3 mb-4"
          v-for="fundraising in getFundraisings"
          :key="fundraising.id"
        >
          <CardItem :fundraising="fundraising" />
        </div>
      </div>
    </div>
    <div v-else class="empty-note">No available fundraising</div>
  </div>
</template>

<script>
import _ from 'lodash';
import CardItem from '@/components/CardItem.vue';
import FundraisingService from '../services/fundraising.service';

export default {
  components: {
    CardItem,
  },
  computed: {
    getFundraisings() {
      const filteredFundraisings = this.searchName === ''
        ? this.fundraisings
        : _.filter(this.fundraisings, (fundraising) => {
          const result = fundraising.title.match(new RegExp(this.searchName, 'i'));

          return result && result.length > 0;
        });

      return filteredFundraisings;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  data: () => ({
    fundraisings: [],
    searchName: '',
  }),
  mounted() {
    FundraisingService.getAllFundraisings({ status: 'Ongoing' }).then(
      (response) => {
        this.fundraisings = response.data.content;
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
  },
};
</script>

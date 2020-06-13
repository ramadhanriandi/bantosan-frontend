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
            :to="getUser && getUser.username ? '/your-fundraising/create' : '/login'"
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
import { mapGetters } from 'vuex';
import CardItem from '@/components/CardItem.vue';

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
    ...mapGetters([
      'getUser',
    ]),
  },
  data() {
    return {
      fundraisings: [
        {
          id: 'abcdef1',
          title: 'Bantuan Kemanusiaan Tsunami Aceh',
          image: 'rectangle.png',
          target: 40000000000,
          endDate: '2020-09-14T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasdas',
            username: 'dwi_handayani',
            fullname: 'Dwi Handayani',
          },
          totalDonation: 26812345000,
        },
        {
          id: 'abcdef2',
          title: 'Korban Banjir Lengkeka Poso Butuh Bantuan',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-07-07T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasda1',
            username: 'act_sulteng',
            fullname: 'Aksi Cepat Tanggap Sulawesi Tengah',
          },
          totalDonation: 17295123,
        },
        {
          id: 'abcdef3',
          title: 'Bantu Korban Banjir Jawa Barat dan Banten',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-08-07T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasda2',
            username: 'act',
            fullname: 'Aksi Cepat Tanggap',
          },
          totalDonation: 20296131,
        },
        {
          id: 'abcdef4',
          title: 'Bantu Korban Bencana Indonesia',
          image: 'rectangle.png',
          target: 200000000,
          endDate: '2020-11-01T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasda3',
            username: 'baznas',
            fullname: 'Badan Amil Zakat Nasional',
          },
          totalDonation: 30158212,
        },
        {
          id: 'abcdef5',
          title: 'Korban Banjir Lengkeka Poso Butuh Bantuan',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-07-07T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasda1',
            username: 'act_sulteng',
            fullname: 'Aksi Cepat Tanggap Sulawesi Tengah',
          },
          totalDonation: 17295123,
        },
        {
          id: 'abcdef6',
          title: 'Bantu Korban Banjir Jawa Barat dan Banten',
          image: 'rectangle.png',
          target: 50000000,
          endDate: '2020-08-07T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasda2',
            username: 'act',
            fullname: 'Aksi Cepat Tanggap',
          },
          totalDonation: 20296131,
        },
        {
          id: 'abcdef7',
          title: 'Bantu Korban Bencana Indonesia',
          image: 'rectangle.png',
          target: 200000000,
          endDate: '2020-11-01T01:00:00+01:00',
          createdBy: {
            id: 'sdasfasda3',
            username: 'baznas',
            fullname: 'Badan Amil Zakat Nasional',
          },
          totalDonation: 30158212,
        },
      ],
      searchName: '',
    };
  },
};
</script>

<template>
  <div class="w-100">
    <div class="row">
      <div class="col-12 col-sm-12 col-lg-1 mb-4 mb-sm-4 mb-lg-0 text-left" >
        <router-link to="/fundraising-list"><img src="@/assets/img/back.png" /></router-link>
      </div>
      <div class="col-12 col-sm-12 col-lg-11 mb-4 mb-sm-4 mb-lg-0">
        <h2 class="title mb-2">{{ getTitle }}</h2>
        <p class="subtitle">{{ getSubtitle }}</p>
      </div>
    </div>
    <form class="row text-left" @submit="submitForm" method="post">
      <div class="col-12 col-sm-12 col-lg-4 offset-0 offset-sm-0 offset-lg-1">
        <div class="form-group">
          <label>Title</label>
          <input
            type="text"
            class="form-control p-3"
            v-model="fundraising.title"
            required
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            class="form-control p-3"
            rows="15"
            v-model="fundraising.description"
            required
          >
          </textarea>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-3">
        <img
          v-if="getUrl === 'edit'"
          class="fundraising-img mb-3 w-100"
          :src="require(`@/assets/img/${fundraising.image}`)"
        />
        <div class="form-group">
          <label>Image</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile">
            <label class="custom-file-label" for="customFile">Upload an image</label>
          </div>
        </div>
        <div class="form-group">
          <label>Total Days</label>
          <input
            type="number"
            v-model="fundraising.day"
            class="form-control p-3"
            min="1"
            required
          />
        </div>
        <div class="form-group">
          <label>Target</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">IDR</div>
            </div>
            <input
              type="number"
              v-model="fundraising.target"
              class="form-control p-3"
              placeholder="min : 100,000"
              min="100000"
              required
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-4">
        <div v-for="(bank, index) in fundraising.banks" :key="index" class="card p-3 mb-3">
          <div class="form-row">
            <div class="form-group col-4">
              <label>Bank</label>
              <input
                type="text"
                class="form-control p-3"
                v-model="bank.name"
                required
              />
            </div>
            <div class="form-group col-8">
              <label>Account Number</label>
              <input
                type="text"
                class="form-control p-3"
                v-model="bank.accountNumber"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label>Account Holder Name</label>
            <input
              type="text"
              class="form-control p-3"
              v-model="bank.accountHolder"
              required
            />
          </div>
          <div class="d-flex justify-content-end">
            <button @click="removeBank(index)" class="btn-sm btn-red-reverse px-3">Delete</button>
          </div>
        </div>
        <div class="d-flex justify-content-end mb-4">
          <button @click="addBank" class="btn-sm btn-purple-reverse px-3">Add Bank Account</button>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-purple my-2">{{ getButtonText }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import utils from '@/assets/js/utils';

export default {
  computed: {
    getButtonText() {
      return this.getUrl === 'create' ? 'Submit' : 'Save Changes';
    },
    getTitle() {
      return `${this.getUrl.charAt(0).toUpperCase() + this.getUrl.slice(1)} a Fundraising`;
    },
    getSubtitle() {
      return this.getUrl === 'create'
        ? 'Fill in the form below to create a fundraising' : `Latest Update : ${this.convertDate(this.fundraising.updatedAt)}`;
    },
    getUrl() {
      const parsedUrl = this.$route.path.split('/');
      return parsedUrl[parsedUrl.length - 1];
    },
  },
  data() {
    return {
      fundraising: {
        id: 'abcdef1',
        title: 'Bantuan Kemanusiaan Tsunami Aceh',
        image: 'rectangle.png',
        description: 'Pengungsi Masih Terlunta, Ayo Bangun Lebak Kembali! Sebanyak 6 kecamatan yang meliputi 30 desa di Kabupaten Lebak terdampak banjir. Qadarullah, kejadian itu juga menyebabkan 10 orang meninggal dunia dan 67 orang luka-luka. Selain korban jiwa, sebanyak 16 sekolah juga mengalami kerusakan serta 1.253 siswa terdampak. Banjir itu juga menerjang 18 pesantren, 28 jembatan, 5 jaringan irigasi, dan hampir seribu hektar sawah warga. Dan, sebanyak 3.041 unit rumah mengalami kerusakan yang menyebabkan ribuan warga harus mengungsi karena banyak dari mereka yang rumahnya tak layak dihuni lagi.',
        target: 40000000000,
        updatedAt: '2020-09-14T01:00:00+01:00',
        day: 100,
        banks: [{
          bankId: 0,
          name: 'BNI',
          accountNumber: '1241241241',
          accountHolder: 'Any Name Here',
        }, {
          bankId: 1,
          name: 'BRI',
          accountNumber: '1241241241',
          accountHolder: 'Any Name Here',
        }],
      },
    };
  },
  methods: {
    addBank() {
      if (this.fundraising.banks.length < 3) {
        this.fundraising.banks.push({
          name: null,
          accountNumber: null,
          accountHolder: null,
        });
      }
    },
    convertDate(date) {
      return utils.convertDate(new Date(date));
    },
    removeBank(index) {
      if (this.fundraising.banks.length > 1) {
        this.fundraising.banks.splice(index, 1);
      }
    },
    submitForm(e) {
      const {
        title, description, days, target,
      } = this.fundraising;

      if (title && description && days && target) {
        return true;
      }

      e.preventDefault();

      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.fundraising-img {
  border-radius: 5px;
}
</style>

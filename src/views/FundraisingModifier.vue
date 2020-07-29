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
    <form class="row text-left" @submit.prevent="handleSubmit" method="post">
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
          :src="require(`@/assets/img/rectangle.png`)"
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
        <div v-for="(bank, index) in banks" :key="index" class="card p-3 mb-3">
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
import Fundraising from '../models/fundraising';
import FundraisingService from '../services/fundraising.service';

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
        ? 'Fill in the form below to create a fundraising'
        : `Latest Update : ${this.convertDate(this.fundraising.updatedAt)}`;
    },
    getUrl() {
      const parsedUrl = this.$route.path.split('/');
      return parsedUrl[parsedUrl.length - 1];
    },
  },
  data: () => ({
    banks: [],
    fundraising: new Fundraising(),
    message: '',
  }),
  methods: {
    addBank() {
      if (this.banks.length < 3) {
        this.banks.push({
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
      if (this.banks.length > 1) {
        this.banks.splice(index, 1);
      }
    },
    handleSubmit() {
      this.message = '';

      if (this.getUrl === 'create') {
        this.fundraising = {
          ...this.fundraising,
          banks: this.banks,
          organizer: this.$store.state.auth.user.id,
        };

        FundraisingService.postFundraising(this.fundraising).then(
          (response) => {
            const { success, errorMessage } = response.data;
            if (success) {
              this.message = 'Your fundraising submission is success';
              this.$swal({
                icon: 'success',
                title: 'Success',
                text: this.message,
                timer: 2000,
                timerProgressBar: true,
                onClose: () => {
                  this.$router.push('/fundraising-list');
                },
              });
            } else {
              this.message = errorMessage;
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: this.message,
              });
            }
          },
          (error) => {
            this.message = error.response.data.errorMessage
              || error.response.data.status;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: this.message,
            });
          },
        );
      } else if (this.getUrl === 'edit') {
        FundraisingService.putFundraising(this.fundraising.id, this.fundraising).then(
          () => {
            this.message = 'Your fundraising is updated';
            this.$swal({
              icon: 'success',
              title: 'Success',
              text: this.message,
              timer: 2000,
              timerProgressBar: true,
              onClose: () => {
                this.$router.push(`/fundraising-list/${this.fundraising.id}`);
              },
            });
          },
          (error) => {
            this.message = error.response.data.errorMessage
              || error.response.data.status;
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: this.message,
            });
          },
        );
      }
    },
  },
  mounted() {
    if (this.getUrl === 'edit') {
      FundraisingService.getFundraisingById(this.$route.path.split('/')[2]).then(
        (response) => {
          this.fundraising = response.data.value;
          this.banks = response.data.value.banks;
          this.startDate = null;
          this.status = 'Pending';
        },
        (error) => {
          this.message = error.response.data.errorMessage
              || error.response.data.status;
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.message,
          });
        },
      );
    } else {
      this.banks = [
        {
          bankId: 0, name: null, accountNumber: null, accountHolder: null,
        },
      ];
    }
  },
};
</script>

<style scoped lang="scss">
.fundraising-img {
  border-radius: 5px;
}
</style>

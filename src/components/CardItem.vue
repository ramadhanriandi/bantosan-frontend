<template>
  <router-link :to="`/fundraisings/${fundraising.id}`" class="card-link">
    <div class="card-wrapper text-left">
      <img class="card-img" :src="require(`@/assets/img/${fundraising.image}`)" />
      <div class="card-body">
        <h4>{{ getTitle }}</h4>
        <div>
          {{ getFullname }} <img class="ml-1" src="@/assets/img/verified.png" />
        </div>
        <KProgress
          :active="true"
          class="my-2 w-100"
          bg-color="#F4C403"
          color="#7F51DF"
          :line-height="4"
          :percent="getPercentage"
          :show-text="false"
        />
        <div class="d-flex justify-content-between">
          <p class="m-0">Donated</p>
          <p class="m-0">Days Left</p>
        </div>
        <div class="card-fill d-flex justify-content-between">
          <p class="m-0">IDR {{ getDonation }}</p>
          <p class="m-0">{{ getDaysLeft }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import KProgress from 'k-progress';
import utils from '@/assets/js/utils';

export default {
  name: 'CardItem',
  props: {
    fundraising: { type: Object, required: true },
  },
  components: {
    KProgress,
  },
  computed: {
    getDaysLeft() {
      return utils.getDaysLeft(new Date(this.fundraising.endDate));
    },
    getDonation() {
      return utils.convertCurrency(this.fundraising.totalDonation);
    },
    getFullname() {
      return utils.cutString(this.fundraising.createdBy.fullname, 31);
    },
    getPercentage() {
      const { totalDonation, target } = this.fundraising;

      return utils.getPercentage(totalDonation, target);
    },
    getTitle() {
      return utils.cutString(this.fundraising.title, 41);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.card-fill {
  font-size: 14px;
  font-weight: 500;
}

.card-link, .card-link:hover {
  text-decoration: none;
}

.card-img, .card-wrapper {
  border-radius: 22px;
}

.card-wrapper {
  background: $LIGHTER_GREY;
  color: $BLACK;
}

.card-wrapper h4, .card-wrapper h4:hover {
  font-size: 18px;
}

/deep/ .k-progress-outer {
  margin-right: 0px;
  padding-right: 0px;
}
</style>

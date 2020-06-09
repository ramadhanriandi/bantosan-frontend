<template>
  <div class="align-items-center box-item d-flex w-100 mb-3" :class="'background-' + background">
    <img class="box-img m-3" :src="require('@/assets/img/box-' + title.toLowerCase() + '.png')" />
    <div class="d-flex flex-column h-100">
      <h3 class="box-title">{{ title }}</h3>
      <p class="box-subtitle" :class="'color-' + foreground">
        {{ count }} location{{ count > 1 ? 's' : '' }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryItem',
  props: {
    title: { type: String, required: true },
    count: { type: Number, required: true },
    foreground: { type: String, required: true },
    background: { type: String, required: true },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/color.scss';

.box-img {
  height: 35px;
}

.box-item {
  border-radius: 13px;
  height: 57px;
}

.box-title {
  font-size: 14px;
  margin: 12px 0 0 0;
}

.box-subtitle {
  margin-top: 2px;
}

.background-light-red {
  background: $LIGHT_RED;
}

.background-light-yellow {
  background: $LIGHT_YELLOW;
}

.background-light-green {
  background: $LIGHT_GREEN;
}

.background-light-blue {
  background: $LIGHT_BLUE;
}

.background-light-purple {
  background: $LIGHT_PURPLE;
}

.background-light-brown {
  background: $LIGHT_BROWN;
}

.color-red {
  color: $RED;
}

.color-yellow {
  color: $YELLOW;
}

.color-green {
  color: $GREEN;
}

.color-blue {
  color: $BLUE;
}

.color-purple {
  color: $PURPLE;
}

.color-brown {
  color: $BROWN;
}

</style>

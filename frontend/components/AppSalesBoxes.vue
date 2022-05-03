<template>
  <div class="boxes">
    <div class="-sLtLQ" v-for="items in boxes" :key="items">
      <div class="icon"><img :src="items.icon" alt="" /></div>
      <div class="text">{{ items.heading }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxes: [
        {
          icon: '/icon-package.svg',
          heading: 'Free Shipping Globally',
          details: 'Delivery in 4 Days',
        },
        {
          icon: '/icon-cal.svg',
          heading: '24/7 Customer Service',
          details: 'Call us any time',
        },
        {
          icon: '/icon-service.svg',
          heading: 'Easy Online Returns',
          details: 'Send Within 30 Days',
        },
        {
          icon: '/icon-service.svg',
          heading: 'Easy Online Returns',
          details: 'Send Within 30 Days',
        },
        {
          icon: '/icon-service.svg',
          heading: 'Easy Online Returns',
          details: 'Send Within 30 Days',
        },
        {
          icon: '/icon-service.svg',
          heading: 'Easy Online Returns',
          details: 'Send Within 30 Days',
        },
        {
          icon: '/icon-service.svg',
          heading: 'Easy Online Returns',
          details: 'Send Within 30 Days',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.boxes {
  margin-top: 25px;
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #ffffff;
  border-radius: 5px;
  text-align: center;

  .-sLtLQ {
    width: 10% !important;
  }
  .icon {
    img {
      height: 50px !important;
          padding: 5px;
    border:1px solid #00000048;
    border-radius: 10px;
    }
  }

  .text{
    font-size: 12px;
  }
}
</style>

<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss" scoped>
  .loading{
    width: 100%;
    text-align: center;
    img{
      width: 24px;
      height: 24/px;
    }
    .desc{
      line-height: 20/px;
      font-size: 18px;
      color: #999;
    }
  }
</style>

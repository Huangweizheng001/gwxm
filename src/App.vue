<template>
  <div id="app">
    <search></search>
    <m-head></m-head> 
    <router-view/>
    <my-footer/>
  </div>
</template>

<script>
import MHead from '@/components/Layout/mHead/MHead'
import Search from '@/components/Layout/search/Search'
import Footer from '@/components/Layout/footer/Footer'
export default {
  name: 'App',
  components: {
     MHead,
    'my-footer':Footer,
    Search
  }
}
</script>

<style lang="scss">
  @import './common/css/base.scss';
</style>

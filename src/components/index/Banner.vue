<template>
	<div class="index-banner">
		<swiper class="index-swiper"  :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide v-for="(item,index) in bannerArr" :style="{backgroundImage:'url(' + item.iconPath + ')'}" :key="index">
		    	<a class="slide-li" :href="item.href" target="_blank"></a>
		    </swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination" slot="pagination"></div>
	    </swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import {getBanner} from '@/api/dynamic'
	import config from '@/common/config'

	export default {
		name:'Banner',
		components: {
		    swiper,
		    swiperSlide
  		},
		data(){
			return {
		        swiperOption: {
		          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
		          notNextTick: true,
		          // swiper configs 所有的配置同swiper官方api配置
		          autoplay: true,
		          pagination:{
		          	el:'.swiper-pagination',
		          	clickable:true
		          },
		          mousewheelControl : true,
		          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
		          observeParents:true,
		          onSlideChangeEnd: function(swiper){ 
					　　　swiper.update()
				  },
		        },
		        bannerArr:[],
		      }
		},
		mounted(){
			this.$nextTick(function(){
				this.getBannerData();
			})
		},
		methods:{
			getBannerData(){
				let _this = this;
				getBanner("homeBanner").then(res=>{
					if(res.code == 200){
						res.rows.forEach(function(item,index){
							_this.$set(item,"iconPath",config.FILEHOST+item.iconPath);
						})
						_this.bannerArr = res.rows;
					}
				}).then(res=>{
					_this.$refs.mySwiper.update()
				})
			}
		}


	}
</script>

<style lang="scss">
    @import 'swiper/dist/css/swiper.min.css';
	.index-swiper .swiper-wrapper {
		height: 500px;
	}

	.index-swiper .swiper-slide{
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		.slide-li{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
		}
	}

	.index-swiper .swiper-pagination{
		width: 100%;
		bottom: 30px;
		height: 20px;
		text-align: center;
	}

	.index-swiper .swiper-pagination span{
		width: 12px;
		height: 12px;
		border:1px solid #b5b5b5;
		opacity: 1;
		background-color: rgba(0,0,0,0);
	}

	.index-swiper .swiper-pagination .swiper-pagination-bullet-active{
		box-shadow: 0 0 0 2px $mainColor;
		background-color: $mainColor;
	}

	@media screen and ( max-width: 1600px ) {
		.index-swiper .swiper-wrapper {
			height: 400px;
		}
	}
</style>
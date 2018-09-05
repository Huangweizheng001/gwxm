<template>
	<div class="index-show-imgs">
		<swiper class="index-show-swiper"  :options="swiperOption" ref="myImgSwiper">
		    <!-- slides -->
		    <swiper-slide v-for="(item,index) in bannerArr" :style="{backgroundImage:'url('+item+')'}" :key="index"></swiper-slide>
		    <!-- Optional controls -->
	    </swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import {getBanner} from '@/api/dynamic'
	import config from '@/common/config'
	import 'swiper/dist/css/swiper.min.css';

	export default {
		name:'imgs-Banner',
		components: {
		    swiper,
		    swiperSlide 
  		},
  		props:['imgs'],
		data(){
			return {
		     	swiperOption: {
					autoplay: {
						disableOnInteraction: false, //用户操作后是否禁止自动循环
						delay: 3000 //自自动循环时间
					}, //可选选项，自动滑动
					speed: 1000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
					loop: true, //循环切换
					mousewheelControl: true, //设置为true时，能使用鼠标滚轮控制slide滑动
					observer:true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents:true,//修改swiper的父元素时，自动初始化swiper显示）或者修改swiper的子元素时，自动初始化swiper
					 //分页器设置         
	                pagination: {
	                   el: '.swiper-pagination',
	                   clickable :true
	                },
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				},
		        bannerArr:[],
		      }
		},
		mounted(){
			this.$nextTick(function(){
				this.dealData();
			})
		},
		computed: {
		   swiper() {
		     return this.$refs.myImgSwiper.swiper
		   }
		},
		methods:{
			dealData(){
				let _this = this;
				this.bannerArr = this.imgs.split(",");
				this.bannerArr.forEach(function(item,index){
					_this.bannerArr[index] = config.FILEHOST + item;
				})
				this.$refs.myImgSwiper.update()
			}
		}


	}
</script>

<style lang="scss">
	.index-show-imgs .swiper-wrapper {
		height: 500px;
	}

	.index-show-imgs .swiper-slide{
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.index-show-imgs .img-swiper-pagination{
		width: 100%;
		bottom: 30px;
		height: 20px;
		text-align: center;
	}

	.index-show-imgs .swiper-pagination span{
		width: 12px;
		height: 12px;
		border:1px solid #b5b5b5;
		opacity: 1;
		background-color: rgba(0,0,0,0);
	}

	.index-show-imgs .swiper-pagination .swiper-pagination-bullet-active{
		box-shadow: 0 0 0 2px $mainColor;
		background-color: $mainColor;
	}

</style>
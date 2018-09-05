<template>
	<div class="index-news-banner">
		<swiper class="index-news-swiper"  :options="swiperOption" ref="myNewsSwiper">
		    <!-- slides -->
		    <swiper-slide v-for="(item,index) in bannerData" :style="{backgroundImage:'url(' + item.iconPath + ')'}" :key="index">
		    	<p>{{item.name}}</p>
		    	<router-link  :to="'/'+parentTypeId+'/'+item.newsTypeId+'?nid='+item.newsId" target="_blank"></router-link>
		    </swiper-slide>

	    </swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.min.css'
	import config from '@/common/config'

	export default {
		name:'Banner',
		components: {
		    swiper,
		    swiperSlide 
  		},
  		props:["bannerData","parentTypeId"],
		data(){
			return {
		        swiperOption: {
		          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
		          notNextTick: true,
		          // swiper configs 所有的配置同swiper官方api配置
		          autoplay: true,
		          mousewheelControl : true,
		          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
		          observeParents:true,
		        },
		        bannerArr:[
		        	{"img":'../../static/images/index/indexBanner01.jpg'},
		        	{"img":'../../static/images/index/indexBanner02.jpg'},
		        	{"img":'../../static/images/index/indexBanner03.jpg'},
		        	{"img":'../../static/images/index/indexBanner04.jpg'}
		        ],
		      }
		},
		mounted(){
			this.$nextTick(function(){
				this.getBanner();
			})
		},
		methods:{
			getBanner(){
				let _this = this;
				setTimeout(function(){
					_this.$refs.myNewsSwiper.update()
				},300)
			},
		}


	}
</script>

<style lang="scss">
	.index-news-banner {
		padding-top: 23px;
	}
	.index-news-swiper .swiper-wrapper {
		height: 260px;
	}

	.index-news-swiper {
		.swiper-slide{
			cursor:pointer;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;

			a{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
			}
		}

		p{
			position:absolute;
			bottom:0;
			left:0;
			width:100%;
			line-height:40px;
			text-align:center;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			color:#fff;
			background:rgba(0,0,0,.5);
		}
	}

	
</style>
<template>
	<ul class="index-camp">
		<template v-for="(item,index) in campusData">
			<li :key="index" v-if="item.videoId==''" @click="showView(item.photo,'图片集')">
				<router-link class="index-li" to="">
					<div class="left">
						<img :src="item.iconPath" alt="">
					</div>
					<div class="right">
						<p>{{item.title}}</p>
						<span>{{item.created}}</span>
					</div>
				</router-link>
			</li>
			<li :key="index" v-else  @click="showView2(item.videoId,item.title)">
				<router-link class="index-li" to="">
					<div class="left">
						<img :src="item.iconPath" alt="">
					</div> 
					<div class="right">
						<p>{{item.title}}</p>
						<span>{{item.created}}</span>
					</div>
				</router-link>
			</li>
		</template>
		
	</ul>
</template>

<script>
	import ImgsShow from './ImgsShow'
	import Video from '@/components/onlineClass/Video'
	import config from '@/common/config'
	export default {
		name:'IndexCamp',
		data(){
			return{

			}
		},
		props:{
			campusData:{
				type:Array
			}
		},
		mounted(){
			this.dealData();
		},
		components:{
			ImgsShow
		},
		methods:{
			dealData(){ 
				let _this = this;
				
			},
			showView(imgs, title) {//图片
	            this.$layer.iframe({
	                content: {
	                    content: ImgsShow,
	                    parent: this,
	                    data: {
	                        imgs: imgs
	                    }
	                },
	                area: ['800px', '600px'],
	                title: title
	            })
        	},
        	showView2(id, title) {//弹框视频
	            this.$layer.iframe({
	                content: {
	                    content: Video,
	                    parent: this,
	                    data: {
	                        vid: id
	                    }
	                },
	                area: ['800px', '600px'],
	                title: title
	            })
        	},
		}
	}
</script>

<style lang="scss" scoped>
	.index-camp{
		.index-li{
			position:relative;
			display:block;
			margin:20px 0;
			padding-left:130px;
			height:80px;
			overflow:hidden;
		}

		.left{
			position:absolute;
			top:0;
			left:0;
			width:122px;
			height:80px;

			img{
				display:block;
				width:100%;
				max-height:100%;
			}
		}
		.right{
			color:#666;
			p{
				height:42px;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			span{
				position:absolute;
				bottom:0;
				right:0;
				font-size:12px;
				color:#999;
			}
		}

	}
</style>
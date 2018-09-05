<template>
	<div class="index-online">
		<div class="span4" v-for="(item,index) in onlineData" :key="index" @click="showView(item.videoId,item.courseName)">
			<router-link class="index-li" to="">
				<div class="images">
					<img :src="item.iconPath" alt="">
				</div>
				<p>{{item.courseName}}</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	import Video from '@/components/onlineClass/Video'
	export default {
		name:'IndexOnline',
		data(){
			return{

			}
		},
		props:['onlineData'], 
		components:{
			Video
		},
		methods:{
			showView(id, title) {//弹框视频
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
	.index-online{
		margin-left:-20px;
		margin-top: 20px;

		.index-li{
			display:block;
			margin-left:20px;
			margin-bottom:6px;

			img{
				width:100%;
				max-height:100%;
			}
		}

		.images{
			height:126px;
			overflow:hidden;
		}

		p{
			line-height:28px;
			overflow:hidden;
			text-overflow: ellipsis;
			text-align:center;
			white-space:nowrap;
			color:#666;
		}
	}
</style>
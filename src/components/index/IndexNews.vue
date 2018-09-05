<template>
	<ul class="index-news">
		<li v-for="(item,index) in newsData" :key="index">
			<router-link class="index-li" :to="'/'+parentTypeId+'/'+item.newsTypeId+'?nid='+item.newsId" target="_blank">{{item.name}}<span>{{item.reportDate}}</span></router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		name:'IndexNews',
		data(){
			return{

			}
		},
		props:['newsData','parentTypeId']
	}
</script>

<style lang="scss" scoped>
	.index-news{
		min-height:200px;
	}
	.index-news li{
		position:relative;
	}

	.index-li{
		position:relative;
		display:block;
		padding:0 96px 0 16px;
		line-height:50px;
		border-bottom:1px solid #ededed;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		color:#666;

		span{
			position:absolute;
			right:0;
			top:0;
			line-height:50px;
			font-size:12px;
			color:#999;
		}
		&:after{
			content:'';
			position:absolute;
			width:6px;
			height:6px;
			left:0;
			top:0;
			bottom:0;
			margin:auto;
			border:1px solid $mainColor;
			border-radius:50%;
		}

		&:hover{
			color:$mainColor;
			span{
				color:$mainColor;
			}
		}
	}
</style>
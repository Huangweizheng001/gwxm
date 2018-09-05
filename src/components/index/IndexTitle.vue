<template>
	<div class="indexTitle">
		<span class="chinaTitle">{{chinaTitle}}</span>
		<span class="englishTitle">/{{englishTitle}}</span>
		<router-link class="more" target="_blank" :to="'/'+parentTypeId+'/'+typeId">更多></router-link>
	</div>
</template>

<script>
	export default {
		name:'IndexTitle',
		props:['chinaTitle','englishTitle','parentTypeId','typeId'],
		data(){
			return{
 
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.indexTitle{
		border-bottom:1px solid #e5e5e5;

		.chinaTitle{
			position:relative;
			font-size:30px;
			color:#111;

			&:after{
				content:"";
				position:absolute;
				width:100%;
				height:3px;
				left:0;
				bottom:-4px;
				background-color: $mainColor;
			}
		}
		.englishTitle{
			color:#111;
		}

		.more{
			float:right;
			line-height: 40px;
			font-size:16px;
			color:#bebebe;
			transition:all .3s;

			&:hover{
				color:$mainColor;
			}
		}
	}
</style>
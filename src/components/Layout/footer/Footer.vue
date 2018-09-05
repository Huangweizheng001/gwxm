<template>
	<div class="footer-wrap">
		<div class="container">
			<div class="footer-inner clearfix" v-for="(item,index) in footerArr" :key="index">
				<div class="span7">
					<div class="footer-left">
						<div class="span5">
							<div class="img">
								<img :src='item.logo' alt="">
							</div>
						</div>
						<div class="span7">
							<div class="inf">
								<p>地址：{{item.adress}}</p>
								<p>电话：{{item.telphone}}</p>
								<p>邮件：{{item.email}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="span5">
					<div class="footer-right">
						<div class="span4">
							<div class="weixin-box">
								<img :src="item.officialAccount">
							</div>
							<p>学校微信公众号</p>
						</div>
						<div class="span4">
							<div class="weixin-box">
								<img :src="item.studentApp">
							</div>
							<p>学生端app下载</p>
						</div>
						<div class="span4">
							<div class="weixin-box">
								<img :src="item.teacherApp"> 
							</div>
							<p>教师端app下载</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getFooter} from '@/api/dynamic'
	import config from '@/common/config'
	export default{
		name:'my-footer',
		data(){
			return{
				footerArr:[],
			}
		},
		mounted(){
           
		},
		created(){
  			let _this = this; 
  			getFooter().then(res=>{
  				if(res.code == 200){
			        res.rows.forEach((item, index) => {
					   this.$set(item, "officialAccount", config.FILEHOST + item.officialAccount);
					   this.$set(item, "studentApp", config.FILEHOST + item.studentApp);
					   this.$set(item, "teacherApp", config.FILEHOST + item.teacherApp);
					   this.$set(item, "logo", config.FILEHOST + item.logo);
                    });
					 _this.footerArr = res.rows;
					
				}
				  
  			})
		},
		methods:{
			
		}
	}
</script>


<style lang="scss" scoped>
	.footer-wrap{
		background:url(../../../assets/footerBg.jpg) no-repeat;
		background-size:cover;
	}

	.footer-inner{
		padding:40px 26px;

		.inf{
			line-height:32px;
			color:#fff;
		}
	}

	.footer-left{
		padding:20px 0;
	}

	.footer-right{
		text-align:center;
		color:#fff;
	}
    .span4{
	    .weixin-box{
			width: 130px;
			height: 130px;
			background-color: white;
            img{
               width: 100%;
			   height: 100%;
			}
	    }
		p{
			line-height:30px;
			width: 130px;
		}
	}
	.img{
		width: 225px;
		height: 100px;
		background-color: white;
		img{
			width: 100%;
			height: 100%;
		}
	}
	
</style>
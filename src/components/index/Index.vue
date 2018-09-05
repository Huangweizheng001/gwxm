<template>
	<div class="index">
		<index-swiper/>
		<div class="container">
			<div class="index-inner clearfix">
				<div class="span8">
					<div class="school-box clearfix">
						<index-title chinaTitle="校园新闻" englishTitle="NEWS" :parentTypeId="schoolParentTypeId" :typeId="schoolTypeId"/>
						<div class="school-innerBox">
							<div class="span6">
								<news-banner :bannerData="schoolBanner" :parentTypeId="schoolParentTypeId"/>
							</div>
							<div class="span6">
								<index-news :newsData="schoolArr" :parentTypeId="schoolParentTypeId"/>
							</div>
						</div>
					</div> 
					<div class="reportBox clearfix">
						<index-title chinaTitle="专属报道" englishTitle="REPORTS" :parentTypeId="schoolParentTypeId" :typeId="reportsTypeId"/>
						<div class="reportInnerBox">
							<div class="span6">
								<index-news :newsData="reportsArr" :parentTypeId="schoolParentTypeId"/>
							</div>
							<div class="span6">
								<index-news :newsData="reportsArr2" :parentTypeId="schoolParentTypeId"/>
							</div>
						</div>
					</div>
					<div class="onlineBox clearfix">
						<index-title chinaTitle="在线课堂" englishTitle="CLASSROOM" parentTypeId="resource" typeId="1"/>
						<index-online :onlineData="onlineArr"/>
					</div>
				</div>

				<div class="span4">
					<div class="recruitBox clearfix">
						<index-title chinaTitle="招生专栏" englishTitle="RECRUIT" :parentTypeId="schoolParentTypeId" :typeId="recruitTypeId"/>
						<index-news :newsData="recruitArr" :parentTypeId="schoolParentTypeId"/>
					</div>
					<div class="dynamicBox clearfix">
						<index-title chinaTitle="德育动态" englishTitle="DYNAMIC" :parentTypeId="dynamicParentTypeId" :typeId="dynamicTypeId"/>
						<index-news :newsData="dynamicArr" :parentTypeId="dynamicParentTypeId"/>
					</div>
					<div class="campusBox clearfix">
						<index-title chinaTitle="校园风采" englishTitle="CAMPUS" parentTypeId="school" typeId="3"/>
						<index-campus :campusData="campusArr"/>
					</div>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	import IndexBanner from './Banner'
	import IndexTitle from './IndexTitle'
	import NewsBanner from './NewsBanner'
	import IndexNews from './IndexNews'
	import IndexCampus from './IndexCampus'
	import IndexOnline from './IndexOnline'
	import {getNewsList,getCampus,getOnlineList} from '@/api/dynamic'
	import config from '@/common/config'

	export default {
		name:'Index',
		data(){
			return{
				schoolParentTypeId:33,   //父Id
				schoolTypeId:34,         //学校分类Id
				schoolBanner:[],
				schoolArr:[],

				recruitTypeId:35,       //招生Id35
				recruitArr:[],

				reportsTypeId:36,       //专属报道ID36
				reportsArr:[],
				reportsArr2:[],

				dynamicParentTypeId:29, //父Id
				dynamicTypeId:30,       //德育动态Id 30
				dynamicArr:[],

				campusArr:[],    //校园风采

				onlineArr:[],    //在线课堂
			} 
		},
		components: {
		    "index-swiper":IndexBanner,
		    "index-title":IndexTitle,
		    "index-news":IndexNews,
		    "news-banner":NewsBanner,
		    "index-campus":IndexCampus,
		    "index-online":IndexOnline
  		},
  		mounted(){
  			//新闻中心id：33[父]
  			//学校新闻id：34
  			//招生专栏id:35
  			//专属报道id：36
  			//德育动态id：30
  			this.getSchoolData(this.schoolTypeId,1,6);  //校园新闻
  			this.getRecruitData(this.recruitTypeId,1,6);//招生专栏
  			this.getReportsData(this.reportsTypeId,1,6);//专属专栏1
  			this.getReportsData(this.reportsTypeId,2,6);//专属专栏2
  			this.getDynamicData(this.dynamicTypeId,1,6);//德育动态
  			this.getCampusData(1,3);//校园风采
  			this.getOnlineData('','','',1,6);  //在线课堂
  		},
  		methods:{
  			getSchoolData(id,start,size){
  				let _this = this;
  				getNewsList(id,start,size).then(res=>{
  					if(res.code == 200){
  						_this.schoolArr = res.rows;
  						if(res.rows[0]){
  							_this.schoolBanner.push(res.rows[0]);
							_this.schoolBanner.forEach(function(item,index){
								_this.$set(item,"iconPath",config.FILEHOST+item.iconPath);
							})
  						}
  						
  					}
  				})
  			},
  			getRecruitData(id,start,size){
  				let _this = this;
  				getNewsList(id,start,size).then(res=>{
  					if(res.code == 200){
  						_this.recruitArr = res.rows;  						
  					}
  				})
  			},
  			getReportsData(id,start,size){
  				let _this = this;
  				getNewsList(id,start,size).then(res=>{
  					if(res.code == 200){
  						if(start == 2){
  							_this.reportsArr2 = res.rows; 
  						}else{
  							_this.reportsArr = res.rows; 
  						} 						
  					}
  				})
  			},
  			getDynamicData(id,start,size){
  				let _this = this;
  				getNewsList(id,start,size).then(res=>{
  					if(res.code == 200){
  						_this.dynamicArr = res.rows;  						
  					}
  				})
  			},
  			getCampusData(start,size){
  				let _this = this;
  				getCampus(start,size).then(res=>{
  					_this.campusArr = res.rows;
  					_this.campusArr.forEach(function(item,index){
						_this.$set(item,"imgs",item.photo.split(","));
						_this.campusArr[index].imgs.forEach(function(imgItem, imgIndex){
							if(imgIndex == 0){
								_this.$set(item,"iconPath",config.FILEHOST+imgItem);
							}
						});
					})
  				})
  			},
  			getOnlineData(subjectId,gradeId,termId,start,size){
  				let _this = this;
  				getOnlineList(subjectId,gradeId,termId,start,size).then(res=>{
  					res.rows.forEach(function(item,index){
						_this.$set(item,"iconPath",config.FILEHOST+item.iconPath);
					})
  					_this.onlineArr = res.rows;
  				})
  			}
  		}

	}
</script>

<style lang="scss" scoped>
    .index{
    	padding-bottom:20px;
    	background:#f4f4f4;
    }
	.index-inner{
		padding: 20px 26px;
		background:#fff;
	}

	.index-news-banner{
		padding-right:26px;
	}

	.school-box{
		padding-right:16px;

		.banner{
			padding:27px 27px 19px 0;
		}

	}
	.reportBox,.dynamicBox,.onlineBox,.campusBox{
		margin-top:20px;
	}

	.reportInnerBox{
		margin-left:-50px;

		.index-news{
			margin-left:50px;
		}
	}



	.recruitBox,.dynamicBox,.campusBox {
		padding-left:80px;
	}
</style>
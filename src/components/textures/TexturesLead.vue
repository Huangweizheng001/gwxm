<template>
<div class="texturesLead">
     
	<ul class="textures-list-lead" v-if="isShowList"> 
        <li v-for="(item,index) in listArr" :key="index">
            <div class="textures-lead">
           <div class="textures-leadImg">
               <img :src="item.iconPath" alt="" >
               </div> 
            <div class="textures-leader">
                <h2>{{item.name}}</h2>
                <p>{{item.introduce}}</p>
                <router-link :to='{path: currentPath, query:{nid: item.newsId}}' class="item" tag="a" target="_blank">查看更多</router-link>
            </div>      
        </div>
        </li>
        
        <ul class="pagenationbox" style="position: absolute;bottom: 0;left: 0;right: 0">
                <li v-cloak v-show="current != 1" @click="current-- && goto(current--)">
                    <a >上一页</a>
                </li>
                <li v-cloak v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                    <a >{{index}}</a>
                </li>
                <li v-cloak v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)">
                    <a >下一页</a>
                </li>
            </ul>
            <div class="loading-container" v-show="!isload">
                <loading></loading>
            </div>
            <div v-if="nodata">
                <nodata></nodata>
            </div>
        </ul>

        <div v-if="!isShowList" class="detail">
            <div class="loading-container" v-show="!isload">
                <loading></loading>
            </div>
            <div class="title">{{detail.name}}</div>
            <p class="time">发布时间 : {{detail.reportDate}}</p>
            <div class="desc" v-html="detail.newsDetail"></div>
            <!-- <div class="enclosure">
                <span>附件:</span>
                <a href="#this">清华丘成桐数学科学中心华丘成桐数学科华丘成桐数学科</a>
            </div> -->
        </div>
        </div>
</template>

<script>
import Nodata from '@/base/nodata/Nodata'
import Loading from '@/base/loading/Loading'
import { getNewsList, getNewsDetail, getLeaderList, getLeaderDetail} from "@/api/dynamic"
import config from '@/common/config'

export default {
  name: "TexturesLead",
  data() {
    return {
      isPresentLeader: false, //判断是否是现任领导页面
      isShowList: true,
      showItem: 4, //页码显示条数
      allpage: 0, //总页数
      current: 1, //当前页
      listArr: [],
      nodata: false,
      currentPath: "",
      detail: {}, //详情信息
      isload: false
    };
  },
  computed: {
    pages: function() {
      var pag = [];
      if (this.current < this.showItem) {
        //如果当前的激活的项 小于要显示的条数
        //总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.showItem, this.allpage);
        while (i) {
          pag.unshift(i--);
        }
      } else {
        //当前页数大于显示页数了
        var middle = this.current - Math.floor(this.showItem / 2), //从哪里开始
          i = this.showItem;
        if (middle > this.allpage - this.showItem) {
          middle = this.allpage - this.showItem + 1;
        }
        while (i--) {
          pag.push(middle++);
        }
      }
      return pag;
    }
  },
  mounted() {
    this.isShowList = this.$route.query.nid == undefined ? true : false;
    // console.log(this.$route)
    if (this.isShowList) {
      // 加载列表
      this.isPresentLeader = this.$route.path.split("/")[1] == "school" ? true : false;
      // console.log(this.$route.path)
      if (this.isPresentLeader) {//加载现任领导页面
          this.getPresentLeader(1)
      } else {
        // 默认状态
        this.getTextures(1);
      }
    } else {
      // 加载详情
      this.isPresentLeader = this.$route.path.split("/")[1] == "school" ? true : false;
      // console.log(this.$route.path)
      if (this.isPresentLeader) {//加载现任领导页面
          this.getPresentLeaderDetail()
      } else {
        // 默认状态
        this.getDetail();
      }
    }
  },
  methods: {
    getPresentLeader(pageIndex) {//获取现任领导
      this.currentPath = this.$route.path;
      this.isload = false;
      this.nodata = false
      getLeaderList(pageIndex, 4).then(res => {
        this.isload = true;
        if (res.code == 200) {
          if (res.rows.length < 1) {
            // console.log("没有数据");
            this.nodata = true;
          }
          res.rows.forEach((item, index) => {
              this.$set(item, "iconPath", config.FILEHOST + item.iconPath);
          });
          this.listArr = res.rows;
          // console.log(this.listArr);
          this.allpage = res.totalPageCount;
        }
      });
    },
    getTextures(pageIndex) {
      // 获取二级导航id
      this.currentPath = this.$route.path;
      let id = this.$route.path.split("/")[2];
      this.isload = false;
      this.nodata = false
      getNewsList(id, pageIndex, 4).then(res => {
        this.isload = true;
        if (res.code == 200) {
          if (res.rows.length < 1) {
            // console.log("没有数据");
            this.nodata = true;
          }
          res.rows.forEach((item, index) => {
              this.$set(item, "iconPath", config.FILEHOST + item.iconPath);
          });
          this.listArr = res.rows;
          // console.log(this.listArr);
          this.allpage = res.totalPageCount;
        }
      });
    },
    getDetail() {
      this.isload = false;
      getNewsDetail(this.$route.query.nid).then(res => {
        this.isload = true;
        if (res.code == 200) {
          if (res.rows && res.rows.length > 0) {
            this.detail = res.rows[0];
          }
        }
      });
    },
    getPresentLeaderDetail() {
      this.isload = false;
      getLeaderDetail(this.$route.query.nid).then(res => {
        this.isload = true;
        if (res.code == 200) {
          if (res.rows && res.rows.length > 0) {
            this.detail = res.rows[0];
          }
        }
      });
    },
    // goToDetail(id) {
    //     this.$router.push({ path: this.$route.path, query: {nid: id} })
    // },
    goto: function(index) {
      //枫叶处理
      var _this = this;
      if (index == this.current) return;
      if (index > this.allpage) {
        this.current = this.current - 2;
        // layer.msg("Sorry ╮(╯_╰)╭ 没有下一页喽！");
        return false;
      }
      this.current = index;
      if (this.isPresentLeader) {
        this.getPresentLeader(this.current)
      } else {
        this.getTextures(this.current)
      }
    }
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.isShowList = this.$route.query.nid == undefined ? true : false;
      if (this.isShowList) {
        // 加载列表
        this.isPresentLeader = this.$route.path.split("/")[1] == "school" ? true : false;
        if (this.isPresentLeader) {//加载现任领导页面
          this.getPresentLeader(1)
        } else {
          // 默认状态
          this.getTextures(1);
        }
      } else {
        // 加载详情
        this.isPresentLeader = this.$route.path.split("/")[1] == "school" ? true : false;
        // console.log(this.$route.path)
        if (this.isPresentLeader) {//加载现任领导页面
            this.getPresentLeaderDetail()
        } else {
          // 默认状态
          this.getDetail();
        }
      }
    }
  },
  components: {
    Loading,
    Nodata
  }
};
</script>

<style lang="scss" scoped>
.textures-lead {
  position: relative;
}
.textures-leadImg {
  position: absolute;
  top: 20px;
  width: 156px;
  height: 190px;
}
.textures-leadImg img {
  width: 100%;
  max-height: 100%;
}
.textures-leader {
  height: 190px;
  padding: 20px 0 0 180px;
}
.textures-leader > p:hover {
  color: #ac1b07;
}
.textures-leader > p {
  height: 88px;
  overflow: hidden;
  margin-top: 10px;
  color: rgb(131, 129, 129);
  font-size: 15px;
}
.textures-leader > a {
  position: absolute;
  bottom: 0;
  color: rgb(209, 15, 15);
  font-size: 17px;
}
.textures-leader > a:hover {
  color: rgb(182, 7, 16);
}
.textures-list-lead{
  position: relative;
  padding-bottom: 160px;
  min-height: 900px;
}
.textures-list-lead > li {
  height: 230px;
  border-bottom: 1px solid #e6e6e6;
}
.textures-list-lead > li:hover {
  background-color: rgb(241, 245, 245);
  transition: all 0.3s linear 0.1s;
}

.detail {
  padding-bottom: 70px;
  .title {
    font-size: 32px;
    color: #111;
    padding: 30px 0;
    text-align: center;
  }
  .time{
    text-align: right;
    font-size: 12px;
    color: #999;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
  }
  .desc {
    padding: 20px 0;
    font-size: 14px;
    color: #333;
  }
  .enclosure {
    padding-top: 30px;
    span {
      display: block;
      padding-bottom: 10px;
    }
    a {
      color: $mainColor;
      text-decoration: underline;
    }
  }
}
</style>
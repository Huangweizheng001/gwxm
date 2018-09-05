<template>
    <div class="search-Wrapper">
        <div class="container" v-for="(item,index) in footerArr" :key="index">
            <div class="logo">
                <img :src="item.logo" alt="">
            </div>
            <div class="search-box">
                <input type="text" v-model="keyword">
                <router-link :to="{path: '/search', query: {key: keyword}}" tag="a"></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {getFooter} from '@/api/dynamic'
import config from '@/common/config'
export default {
    name:'searchHeader',
    data() {
        return { 
        keyword: '',
        footerArr:[],
        }
    },
    created(){
            let _this = this;
            getFooter().then(res=>{
                if(res.code == 200){
                    res.rows.forEach((item, index) => {
                        this.$set(item, "logo", config.FILEHOST + item.logo);
                    });
                     _this.footerArr = res.rows;
                }
                  
            })
        }
}
</script>
<style lang="scss" scoped>
    .search-Wrapper{
        padding: 40px 0;
        .logo{
            display: inline-block;
            width: 242px;
            height: 48px;
            background: $mainColor;
            color: #fff;
            line-height: 48px;
            text-align: center;
            font-size: 18px;
            font-size: 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .search-box{
            float: right;
            width: 450px;
            height: 48px;
            position: relative;
            border: 1px solid $mainColor;
            box-sizing: border-box;
            input{
                position: absolute;
                top: 0;
                left: 0;
                width: 370px;
                height: 46px;
                outline: none;
                border: none;
                padding: 10px;
                font-size: 18px;
            }
            a{
                position: absolute;
                right: 0;
                top: 0;
                width: 80px;
                height: 47px;
                background: url('search-icon.png') no-repeat center $mainColor;
            }
        }
    }
</style>


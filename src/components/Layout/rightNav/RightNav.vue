<template>
    <div class="rightNav">
        <div class="default">
            <div class="title">{{firNavName}}</div>
            <!-- eslint-disable-next-line -->
            <router-link v-for="(item,index) in array" tag="a" :to="item.path" :key="index" class="nav-Item">
                <span>{{item.name}}</span>
            </router-link>
        </div>
        

        <!-- 3D校园文化 -->
        <div class="school-life" v-if="isShow">
            <div class="title">3D校园文化</div>
            <a href="#this"></a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        array: {
            type: Array,
            default: null
        },
        firNavName: {
            type: String
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
    .rightNav{
        .default{
            border: 1px solid #eee;
        }
        .title{
            width: 100%;
            height: 70px;
            line-height: 70px;
            text-align: center;
            background: $mainColor;
            font-size: 18px;
            color: #fff;
            font-weight: 500;
        }
        .nav-Item{
            display: block;
            border-bottom: 1px solid #eee;
            font-size: 16px;
            span{
                display: block;
                padding: 26px;
                color: #000;
                border-left: 5px solid transparent;
                &:hover{
                    color: $mainColor;
                }
            }
            &:last-child{
                border-bottom: none;
            }
        }
        .router-link-active.nav-Item span{
            border-color: $mainColor;
            background: #fdfafa;
            color: $mainColor;
        }
        .school-life{
            margin-top: 20px;
            a{
                display: block;
                width: 100%;
                height: 260px;
                background: url('3d.png') no-repeat center;
            }
        }
    }
</style>


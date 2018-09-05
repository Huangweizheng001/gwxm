<template>
    <div>
        <div id="backcoursePlayer" class="prism-player"></div>
        <div v-if="nodata">
            <nodata></nodata>
        </div>
    </div>
</template>
<script>
import {getVideoId} from '@/api/dynamic'
import Nodata from '@/base/nodata/Nodata'
export default {
    props: {
        vid: {
            type: String
        }
    },
    data() {
        return {
            nodata: false
        }
    },
    mounted() {
        this.getPlayAuth(this.vid)
    },
    methods: {
        getPlayAuth(vid) {
            if (vid == undefined || vid == 'undefined') {
                this.nodata = true
                return
            }
            getVideoId(vid).then(res => {
                // console.log(res)
                if (res.code == 200) {
                    if (res.rows.length > 0) {
                        let aliVid = res.rows[0].playAuth
                        this.createBackPlayerEnDetail(vid, aliVid)
                    }
                }
            })
        },
        createBackPlayerEnDetail(vid, auto) {
            new prismplayer({
                id: "backcoursePlayer", // 容器id
                //source: "http://live.bmizx.net/yicelive/streamyice.flv", // 视频地址
                // source: 'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
                //source: URL,
                vid: vid,
                playauth: auto,
                autoplay: true, //自动播放：否
                width: "100%", // 播放器宽度
                height: "500px", // 播放器高度
                playsinline: true,
                preload: false,
                //isLive: true,
                skinLayout: [{
                    "name": "bigPlayButton",
                    "align": "cc",
                    "x": 30,
                    "y": 80
                }, {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [{
                        "name": "playButton",
                        "align": "tlabs",
                        "x": 10,
                        "y": 25
                    }, {
                        "name": "fullScreenButton",
                        "align": "trabs",
                        "x": 10,
                        "y": 25
                    }, {
                        "name": "volume",
                        "align": "trabs",
                        "x": 50,
                        "y": 25
                    },{"name":"progress","align":"tlabs","x":0,"y":0}]
                }],
                cover: ''
                //cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
            });
        }
    },
    components: {
        Nodata
    }
}
</script>


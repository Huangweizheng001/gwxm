<template>
    <div class="select-box-wrapper">
        <div class="select-box" v-cloak>
            <span>学科:</span>
            <ul>
                <li :class='{"active": currentIndexS == index1}'
                    v-for="(item,index1) in subject"
                    @click="clickSubject(item.subjectId,index1)">
                    {{item.subjectName}}
                </li>
            </ul>
        </div>
        <div class="select-box" v-cloak>
            <span>年级:</span>
            <ul>
                <li :class='{"active": currentIndexG == index2}' 
                    v-for="(item,index2) in grade"
                    @click="clickGrade(item.gradeId,index2)">
                    {{item.gradeName}}
                </li>
            </ul>
        </div>
        <div class="select-box" v-cloak>
            <span>学期:</span>
            <ul>
                <li :class='{"active": currentIndexT == index3}'
                    v-for="(item,index3) in term"
                    @click="clickTerm(item.termId,index3)">
                    {{item.termName}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getTerm, getSubject, getGrade} from '@/api/dynamic'
export default {
    data() {
        return {
            subject: [],//学科
            grade: [], //年级
            term: [], //学期,
            termId: '',
            gradeId: '',
            subjectId: '',
            currentIndexS: 0,
            currentIndexG: 0,
            currentIndexT: 0,
            subject1:[],
            grade1:[],
            term1:[]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            Promise.all([
                new Promise((resolve, reject) => {
                    getTerm().then(res => {
                        if (res.code == 200) {
                            this.termId = res.rows[0].termId
                        }
                        // console.log(res)
                        resolve(res)
                    })
                }),
                new Promise((resolve, reject) => {
                    getSubject().then(res => {
                        if (res.code == 200) {
                            this.subjectId = res.rows[0].subjectId
                        }
                        // console.log(res)
                        resolve(res)
                    })
                }),
                new Promise((resolve, reject) => {
                    getGrade().then(res => {
                        if (res.code == 200) {
                            this.gradeId = res.rows[0].gradeId
                        }
                        // console.log(res)
                        resolve(res)
                    })
                })
            ]).then((res) => {
                this.term = res[0].rows
                this.subject = res[1].rows
                this.grade = res[2].rows
                this.$emit('select', this.subjectId, this.gradeId, this.termId)
            })
        },
        clickSubject(id, index) {
            if (this.currentIndexS == index) {
                return
            }
            this.currentIndexS = index
            this.subjectId = id
            this.$emit('select', id, this.gradeId, this.termId)
        },
        clickGrade(id, index) {
            if (this.currentIndexG == index) {
                return
            }
            this.currentIndexG = index
            this.gradeId = id
            this.$emit('select', this.subjectId, id, this.termId)
        },
        clickTerm(id, index) {
            if (this.currentIndexT == index) {
                return
            }
            this.currentIndexT = index
            this.termId = id
            this.$emit('select', this.subjectId, this.gradeId, id)
        },
    }
}
</script>
<style lang="scss" scoped>
    .select-box-wrapper{
        padding: 20px 0 15px;
        .select-box{
            font-size: 16px;
            padding: 20px 0;
            border-bottom: 1px dashed #e6e6e6;
            min-height: 72px;
            span{
                float: left;
                font-weight: bold;
                color: #111;
            }
            ul{
                margin-left: 50px;
                margin-top: -5px;
                li{
                    margin: 5px 10px;
                    font-size: 14px;
                    color:#666;
                    padding: 2.5px 11px;
                    border-radius: 3px;
                    display: inline-block;
                    &:hover, &.active{
                        color: #fff;
                        background: $mainColor;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>


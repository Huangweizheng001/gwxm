import axios from 'axios'

//导航分类
export function getHeadNav() {
    const url = '/api/website/ashx/NewsType.ashx?action=getNewsType'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

//侧边导航分类
export function getRightNav(id) {
    const url = '/api/website/ashx/NewsType.ashx?action=getNewsTypeByPid'
    const data = {
        parentId: id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

//新闻列表
export function getNewsList(id, start,size) {
    const url = '/api/website/ashx/News.ashx?action=getNewsByType'
    const data = {
        newsTypeId:id,
        pageIndex:start,
        pageSize:size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

//新闻详情
export function getNewsDetail(id) {
    const url = '/api/website/ashx/News.ashx?action=getNewsByNewsId'
    const data = {
        newsId:id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
// 搜索接口
export function searchByKey(name,parentId,start,size) {
    const url = '/api/website/ashx/News.ashx?action=getNewsByName'
    const data = {
        name:name,
        parentId: parentId,
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

//Banner
export function getBanner(type) {
    const url = '/api/website/ashx/banner.ashx?action=getAppBanner'
    const data = {
        bannerType:type
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 学期
export function getTerm() {
    const url = '/api/website/ashx/OnlineClass.ashx?action=getTerm'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 学科
export function getSubject() {
    const url = '/api/website/ashx/OnlineClass.ashx?action=getSubject'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 年级
export function getGrade() {
    const url = '/api/website/ashx/OnlineClass.ashx?action=getGrade'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取在线课程列表
export function getOnlineList(subjectId,gradeId,termId,start,size) {
    const url = '/api/website/ashx/OnlineClass.ashx?action=getPublicCourse'
    const data = {
        subjectId: subjectId,
        gradeId: gradeId,
        termId: termId,
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取视频源
export function getVideoId(id) {
    const url = '/api/website/ashx/OnlineClass.ashx?action=getPlayUrlByVideoId'
    const data = {
        videoId: id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}   
// 学校风采
export function getCampus(start,size) {
    const url = '/api/website/ashx/umt.ashx?action=showMienList'
    const data = {
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取教学资源列表
export function getResourceList(subjectId,gradeId,termId,start,size) {
    const url = '/api/website/ashx/TeachingMaterial.ashx?action=getTeachingMaterial'
    const data = {
        subjectId: subjectId,
        gradeId: gradeId,
        termId: termId,
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取资源详情
export function getResourceDetail(id) {
    const url = '/api/website/ashx/TeachingMaterial.ashx?action=getTeachingMaterialDetail'
    const data = {
        resourceId: id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取在线图书列表
export function getOnlineBook(start, size) {
    const url = '/api/website/ashx/Book.ashx?action=getEBook'
    const data = {
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取图书详情
export function getBookDetail(id) {
    const url = '/api/website/ashx/Book.ashx?action=getBookDetailById'
    const data = {
        bookId: id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取现任领导
export function getLeaderList(start, size) {
    const url = '/api/website/ashx/umt.ashx?action=showLeaderList'
    const data = {
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取现任领导详情
export function getLeaderDetail(id) {
    const url = '/api/website/ashx/umt.ashx?action=showLeaderById'
    const data = {
        id: id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取学校简介
export function schoolInfo() {
    const url = '/api/website/ashx/umt.ashx?action=showIntroduce'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取学校荣誉
export function schoolHonor(start, size) {
    const url = '/api/website/ashx/umt.ashx?action=showHonorList'
    const data = {
        pageIndex: start,
        pageSize: size
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取校徽校训校歌
export function schoolSong() {
    const url = '/api/website/ashx/umt.ashx?action=showAttribute'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

// 获取校徽校训校歌详情
export function schoolSongDetail(id) {
    const url = '/api/website/ashx/umt.ashx?action=showAttributeDetail'
    const data = {
        id: id
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
} 

// 学校基础信息
export function getFooter() {
    const url = '/api/website/ashx/umt.ashx?action=showIntroduce'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
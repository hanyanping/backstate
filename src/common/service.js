import Vue from 'vue'
// import Vuex from 'vuex'
import axios from 'axios'
import Global from './global'
import Util from './util'
import Store from '../vuex/index'
import { Message } from 'element-ui';
axios.interceptors.request.use(config => {
    Store.commit("setIsLoading", true);
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});

function errorState(response) {
    Store.commit("setIsLoading", false);
    //console.log(response)
    // 如果http状态码正常，则直接返回数据
    //if(response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if (response.status == '200') {

    } else {
        Message.error('请求超时，请稍后再试！')
    }

}

function successState(response) {
    Store.commit("setIsLoading", false);
    //统一判断后端返回的错误码
    if (response.status == '200') {

        if (response.data.errorCode == 0) {
        } else if (response.data.errorCode == -1) {
            Message.error('服务端错误，请联系管理员');
        } else if (response.data.errorCode == 1) {
            Message.error(response.data.message);
        } else if (response.data.errorCode == 5001) {
            window.location.href=  document.location.protocol + '//' + window.location.host + '/login'
        }
    } else {
        Message.error('网络请求错误');
    }
}

const getResource = (opts, data) => {
    var tokenVal;
    if(Util.localStorageUtil.get('access_token')){
         tokenVal = Util.localStorageUtil.get('access_token');
    }
    let  contentType = 'application/json; charset=UTF-8';
    if(opts.url.indexOf('sys/ueditor/index') >= 0){
        contentType = 'multipart/form-data'
    }
    let httpDefaultOpts = { //http默认配置
        method: opts.method,
        baseURL: Global.requestUrl,
        url: opts.url,
        timeout: 20000,
        params: data,
        data: data,
        headers: opts.method == 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            'token': tokenVal
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': contentType,
            'token': tokenVal
        }
    };

    if (opts.method == 'get') {
        delete httpDefaultOpts.data
    } else {
        delete httpDefaultOpts.params
    }

    let promise = new Promise(function (resolve, reject) {
        axios(httpDefaultOpts).then(
            (response) => {
                // console.log(opts.url,response.data.errorCode)
                successState(response);
                resolve(response.data)
            }
        ).catch(
            (error) => {
                errorState(error);
                reject(error)
            }
        )

    });
    return promise
};

export default {
    login(){
        return {
            smsCode(data) {
                // 登录
                return getResource({
                    url: '/sys/admin/account/login/sms/code',
                    method: 'post'
                }, data)
            },
            loginSms(data) {
                // 登录
                return getResource({
                    url: '/sys/admin/account/login/sms',
                    method: 'post'
                }, data)
            },
            loginOut(data) {
                // 登录
                return getResource({
                    url: '/sys/admin/account/logout',
                    method: 'post'
                }, data)
            }
        }

    },
    advert(){
        return {
            getadverts: function (data, key) {//获取广告
                return getResource({
                    url: `sys/admin/advert/${key}/items`,
                    method: 'get'
                })
            },
            addadvertPhone: function (data) {
                return getResource({
                    url: '/sys/admin/advert/item/batch/add',
                    method: 'post'
                }, data)
            },
            deleteadvert: function (data,key) {
                return getResource({
                    url: `/sys/admin/advert/item/${key}`,
                    method: 'DELETE'
                }, data)
            },
            getadvert: function (data,key) {
                return getResource({
                    url: `/sys/admin/advert/item/${key}`,
                    method: 'get'
                }, data)
            },
            editoradvert: function (data,key) {
                return getResource({
                    url: `/sys/admin/advert/item/${key}`,
                    method: 'POST'
                }, data)
            },
            itemPublish: function (data,key) {
                return getResource({
                    url: `sys/admin/advert/item/publish`,
                    method: 'POST'
                }, data)
            },
            itemSort: function (data,key) {
                return getResource({
                    url: `sys/admin/advert/item/sort`,
                    method: 'POST'
                }, data)
            },
        }
    },
    news(){
        return {
            getadverts: function (data, key) {//获取广告
                return getResource({
                    url: `sys/admin/advert/${key}/items`,
                    method: 'get'
                })
            },
            addNews: function (data) {
                return getResource({
                    url: '/sys/admin/news',
                    method: 'post'
                }, data)
            },
            getNews: function (data) {
                return getResource({
                    url: '/sys/admin/news',
                    method: 'get'
                }, data)
            },
            getNewsDetail: function (data,key) {
                return getResource({
                    url: `/sys/admin/news/${key}`,
                    method: 'get'
                }, data)
            },
            editorNews:function (data,key) {
                return getResource({
                    url: `/sys/admin/news/${key}`,
                    method: 'post'
                }, data)
            },
            deleteNews: function (data,key) {
                return getResource({
                    url: `/sys/admin/news/${key}`,
                    method: 'DELETE'
                }, data)
            },
        }
    },
    common() {
        return {
            postphone: function (data) {
                return getResource({
                    url: '/sys/ueditor/index?action=uploadimage',
                    method: 'post'
                }, data)
            },
        }
    },
    sys() {
        return {
            getarticleDetail: function (data, key) {//文章详情
                return getResource({
                    url: `/sys/article/${key}`,
                    method: 'get'
                })
            }
        }
    },
    user() {
        return {
            getToken: function (data) {
                return getResource({
                    url: '/usr/user/token',
                    method: 'get'
                }, data)
            },
            getRegcode: function (data) {
                return getResource({
                    url: 'usr/user/reg/code',
                    method: 'post'
                }, data)
            },
            getTeamInfo: function (data) {
                return getResource({
                    url: '/usr/center/team/info',
                    method: 'get'
                }, data)
            },
            getTeamlist: function (data) {
                return getResource({
                    url: '/usr/center/team',
                    method: 'get'
                }, data)
            },
            getWithdraw: function (data) {//提现记录
                return getResource({
                    url: '/usr/center/withdraw',
                    method: 'get'
                }, data)
            },
            getAccount: function (data) {//享宝明细
                return getResource({
                    url: '/usr/center/account',
                    method: 'get'
                }, data)
            },
            getUserInfo: function (data) {
                return getResource({
                    url: '/usr/user/wechat/login',
                    method: 'post'
                }, data)
            },
            getRegcode: function (data) {
                return getResource({
                    url: 'usr/user/reg/code',
                    method: 'post'
                }, data)
            },
            signature: function (data) {
                return getResource({
                    url: 'wx/jsapi/sign',
                    method: 'post'
                }, data)
            },
            reglogin: function (data) {
                return getResource({
                    url: 'usr/user/reg',
                    method: 'post'
                }, data)
            },
            getbankCard: function (data) {
                return getResource({
                    url: 'usr/bankCard',
                    method: 'get'
                }, data)
            },
            getwithdraw: function (data) {
                return getResource({
                    url: 'usr/center/withdraw/info',
                    method: 'get'
                }, data)
            },
            postbankCard: function (data) {
                return getResource({
                    url: 'usr/bankCard',
                    method: 'post'
                }, data)
            },
            getpersonDetail: function (data) {
                return getResource({
                    url: 'usr/center/profile',
                    method: 'get'
                }, data)
            },
            getcenterInfo: function (data) {
                return getResource({
                    url: 'usr/center/info',
                    method: 'get'
                }, data)
            },
            getinfo: function (data) {
                return getResource({
                    url: 'usr/user/info',
                    method: 'get'
                }, data)
            },
            getisSubscribe: function (data) {
                return getResource({
                    url: 'usr/user/wechat/isSubscribe',
                    method: 'get'
                }, data)
            },
            getBalance: function (data) {
                return getResource({
                    url: 'usr/center/balance',
                    method: 'get'
                }, data)
            },
            postWithdraw: function (data) {
                return getResource({
                    url: 'usr/center/withdraw',
                    method: 'post'
                }, data)
            },

        }
    },
}



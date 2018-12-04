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
        }else{
            Message.error(response.data.message)
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
            },
            accountInfo(data) {
                return getResource({
                    url: '/sys/admin/account/info',
                    method: 'GET'
                }, data)
            },
            editorInfo(data) {
                return getResource({
                    url: '/sys/admin/account/info',
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
    partner(){
        return{
            getPartners: function (data) {
                return getResource({
                    url: '/sys/admin/partner',
                    method: 'get'
                }, data)
            },
            addPartner: function (data) {
                return getResource({
                    url: '/sys/admin/partner/batch/add',
                    method: 'post'
                }, data)
            },
            deletePartner: function (data,key) {
                return getResource({
                    url: `/sys/admin/partner/${key}`,
                    method: 'DELETE'
                }, data)
            },
            partnerSort: function (data,key) {
                return getResource({
                    url: `/sys/admin/partner/sort`,
                    method: 'POST'
                }, data)
            },
            editorPartner: function (data,key) {
                return getResource({
                    url: `/sys/admin/partner/${key}`,
                    method: 'POST'
                }, data)
            },
            getPartner: function (data,key) {
                return getResource({
                    url: `/sys/admin/partner/${key}`,
                    method: 'GET'
                }, data)
            },
        }
    },
    article(){
        return{
            getinquiry: function (data) {
                return getResource({
                    url: '/sys/admin/article',
                    method: 'get'
                }, data)
            },
            removeArticle: function (data,key) {
                return getResource({
                    url: `/sys/admin/article/${key}/remove`,
                    method: 'POST'
                }, data)
            },
            deleteArticle: function (data,key) {
                return getResource({
                    url: `/sys/admin/article/${key}`,
                    method: 'DELETE'
                }, data)
            },
            publishArticle: function (data,key) {
                return getResource({
                    url: `sys/admin/article/${key}/publish`,
                    method: 'POST'
                }, data)
            },
            getArticleDetail: function (data,key) {
                return getResource({
                    url: `/sys/admin/article/${key}`,
                    method: 'get'
                }, data)
            },
            editorArticle: function (data,key) {
                return getResource({
                    url: `/sys/admin/article/${key}`,
                    method: 'POST'
                }, data)
            },
            addArticle: function (data,key) {
                return getResource({
                    url: `/sys/admin/article`,
                    method: 'POST'
                }, data)
            },
        }
    },
    role(){
        return{
            getRoles: function (data) {
                return getResource({
                    url: '/sys/admin/role',
                    method: 'get'
                }, data)
            },
            resourceTree: function (data) {
                return getResource({
                    url: 'sys/admin/resource/tree',
                    method: 'get'
                }, data)
            },
            getDetailrole: function (data,key) {
                return getResource({
                    url: `sys/admin/role/${key}`,
                    method: 'GET'
                }, data)
            },
            editorRole: function (data,key) {
                return getResource({
                    url: `sys/admin/role/${key}`,
                    method: 'POST'
                }, data)
            },
            addRole: function (data,key) {
                return getResource({
                    url: `/sys/admin/role`,
                    method: 'POST'
                }, data)
            },
            deleteRole: function (data,key) {
                return getResource({
                    url: `sys/admin/role/${key}`,
                    method: 'DELETE'
                }, data)
            },
        }
    },
    staf(){
      return{
          getstafs: function (data) {
              return getResource({
                  url: '/sys/admin/user',
                  method: 'get'
              }, data)
          },
          addStaf: function (data) {
              return getResource({
                  url: '/sys/admin/user',
                  method: 'POST'
              }, data)
          },
          editorStaf: function (data,key) {
              return getResource({
                  url: `/sys/admin/user/${key}`,
                  method: 'POST'
              }, data)
          },
          getDetailstaf: function (data,key) {
              return getResource({
                  url: `sys/admin/user/${key}`,
                  method: 'GET'
              }, data)
          },
          deleteStaf: function (data,key) {
              return getResource({
                  url: `sys/admin/user/${key}`,
                  method: 'DELETE'
              }, data)
          },
          getAllRole: function (data) {
              return getResource({
                  url: '/sys/admin/role/all',
                  method: 'get'
              }, data)
          },
          chabgePermissions: function (data,key) {
            return getResource({
                url: `/sys/admin/role/permissions`,
                method: 'get'
            }, data)
        },
      }
    },
}



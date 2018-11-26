<style rel="stylesheet/scss" lang="scss"  scoped>
.login{
    background: url(../assets/images/loginBac.jpg) no-repeat center center;
    height: 100vh;
    width: 100%;
    background-size: cover;
    position: relative;
    .loginInfo{
        position: absolute;
        background: rgba(13,13,13,0.4);
        .infoBox{
            display: flex;
            .loginLeft{
                img{
                    width: 129px;
                    height: 35px;
                }
            }
            .loginRight{
                color: #fff;

                .loginText{
                    font-size: 24px;
                }
                .codeBox{
                    position: relative;
                    .code{
                        width: 60%;
                    }
                    .codeText{
                        position: absolute;
                        font-size: 12px;
                    }
                }
                .phone,.code{
                    border: none;
                    border-bottom: 1px solid  #464646;
                    background: rgba(13,13,13,0.1);
                }
            }
        }
    }
}
@media screen and (min-width: 1600px) {
    .login{
        height: 100vh;
        width: 100%;
        .loginInfo{
            position: absolute;
            width: 892px;
            height: 478px;
            background: rgba(13,13,13,0.4);
            left: calc(0.5*(100% - 892px));
            top: calc(0.5*(100vh - 478px));
            .infoBox{
                padding: 71px 102px;
                height: 335px;
                .loginLeft{
                    width: 261px;
                    border-right: 1px solid #464646;
                    line-height: 335px;
                }
                .loginRight{
                    margin-left: 100px;
                    .loginText{
                        margin-bottom: 50px;
                    }
                    .codeBox{
                        .code{
                            width: 78%;
                        }
                        .codeText{
                            top:22px;
                            right: 0;
                            border-bottom: 1px solid  #464646;
                            padding-bottom: 22px;
                            .codeSpan{
                                background: #0abf9b;
                                padding: 8px 8px;
                            }
                            .active {
                                color: #0abf9b;
                            }
                        }
                    }
                    .phone,.code{
                        padding: 22px 0;
                        width:100%;
                        color: #fff;
                    }
                    .loginButton{
                        margin-top: 50px;
                        width: 312px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        background: #0abf9b;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1599px) {
    .login{
        .loginInfo{
            position: absolute;
            width: 522px;
            height: 280px;
            background: rgba(13,13,13,0.4);
            left: calc(0.5*(100% - 522px));
            top: calc(0.5*(100vh - 280px));
            .infoBox{
                padding: 25px 0;
                .loginLeft{
                    width: 170px;
                    border-right: 1px solid #464646;
                    line-height: 216px;
                    text-align: center;
                    img{
                        width: 103px;
                        height: 28px;
                    }
                }
                .loginRight{
                   margin: 0 auto;
                    width: 180px;
                    .loginText{
                        margin-bottom: 25px;
                    }
                    .codeBox{
                        .codeText{
                            top:16px;
                            right: 0;
                            border-bottom: 1px solid  #464646;
                            padding-bottom: 16px;
                            .codeSpan{
                                background: #0abf9b;
                                padding: 8px 8px;
                            }
                        }
                    }
                    .phone,.code{
                        padding: 16px 0;
                        width:100%;
                        color: #fff;
                    }
                    .loginButton{
                        margin-top: 25px;
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        background: #0abf9b;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="login">
        <div class="loginInfo">
            <div class="infoBox">
                <div class="loginLeft">
                    <img src="../assets/images/logo.png">
                </div>
                <div class="loginRight">
                    <h3 class="loginText">登录</h3>
                    <div class="phoneBox">
                        <input type="tel" v-model='phone' @blur="vertifyPhone" maxlength="11" class="phone" placeholder="请输入手机号">
                    </div>
                    <div class="codeBox">
                        <input class='code' v-model='code' type="text" placeholder="请输入验证码">
                        <div class="codeText"><span class="codeSpan cursor" @click="getCodes($event)" :class="{active: isCode}">{{getCode}}</span></div>
                    </div>
                    <div class="loginButton cursor" @click="submit">登录</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import patternRules from '../common/patternRules'
    import Service from '../common/service'
    import Util from '../common/util'
    export default {
        name: "login",
        data() {
            return {
                phone: '',
                code: '',
                isCode: false,
                getCode: "获取验证码",
                time: 60,
            };
        },
        methods:{
            vertifyPhone(){
                if(!((patternRules.mobile).test(this.phone))){
                    this.open3("手机号码有误，请重填");
                    return false;
                }
            },
            open3(message) {
                this.$message({
                    message: message,
                    type: 'warning'
                });
            },
            setCookie(name, value, day) {
                //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
                var expires = day * 1000;
                var date = new Date(+new Date() + expires);
                document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
            },
            getCookie(name) {
                var arr;
                var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {
                    return unescape(arr[2]);
                }
                else {
                    return null;
                }
            },
            //  获取验证码
            getCodes(el) {
                if (!((patternRules.mobile).test(this.phone))) {
                    this.open3('请输入正确手机号！');
                    return false
                } else {
                    let _that = this;
                    var c = document.cookie.indexOf("cookieTime=");

                    if (c != -1) {
                        this.time = this.getCookie('cookieTime');
                        console.log(this.time)
                    } else {
                        this.time = '60'
                    }
                    if (this.time >= 0 && this.isCode) {
                        this.time = '60';
                        return false
                    } else {
                        //调用接口
                        Service.login().smsCode({
                            phone: this.phone
                        }).then(response => {
                            clearInterval(t);       //停止计时器
                            el.target.innerHTML = _that.time + '秒后重试';
                            this.isCode = true;
                            var t = setInterval(function () {
                                if (_that.time > 0) {
                                    _that.time--;
                                    _that.setCookie('cookieTime', _that.time, _that.time);
                                    el.target.innerHTML = _that.time + '秒后重试'
                                }
                                if (_that.time === 0) {
                                    _that.time = 10;
                                    _that.isCode = false;
                                    clearInterval(t);       //停止计时器
                                    el.target.innerHTML = '重获验证码'
                                }
                            }, 1000)
                        }, err => {
                        });

                    }
                }
            },
            submit() {
              if (!(patternRules.mobile.test(this.phone))) {
                    this. open3("手机号码有误，请重填");
                    return false;
                }else if(this.phone.length == 0){
                  this. open3("请输入手机号");
                  return false;
              }else if(this.code.length != 6){
                  this. open3("请输入正确验证码");
                  return false;
              } else {
                    Service.login().loginSms({
                        phone: this.phone,
                        code: parseInt(this.code)
                    }).then(response => {
                        if (response.hasOwnProperty('errorCode')) {
                            if (response.errorCode == 0) {
                                var obj = {
                                    index: 0,
                                    from: 'parent'
                                }
                                Util.localStorageUtil.set('access_token',response.data.token);
                                localStorage.setItem('user',JSON.stringify(response.data))
                                localStorage.setItem('param',JSON.stringify(obj))
                                localStorage.removeItem("childparam");
                                this.$router.push({name: 'home'})
                            } else {
                                this.open3(response.message)
                            }
                        }
                    }, err => {
                    })
                }
            }
        }
    }
</script>


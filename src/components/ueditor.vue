<template>
  <div>
    <script id="editor" type="text/plain" >
    </script>
  </div>
</template>

<script>
  import '../../static/ueditor/ueditor.config.js'
  import '../../static/ueditor/ueditor.all.js'
  import '../../static/ueditor/lang/zh-cn/zh-cn.js'
  import Service from '../common/service'
  export default {
    name: "UEditor",
    props: {
        setid: {
          type: Number
      },
      config: {
          type: Object
      },
        source:{
            type: String
        }
    },
    data() {
      return {
        editor: null,
        contentData:'',
      }
    },
      watch:{
      },
      created(){

      },

    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.delEditor("editor");
      this.editor = UE.getEditor('editor',this.config);
      this.getarticle()
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
        dealDetail(data){
            if(data.content){
                this.contentData = data;
                this.$nextTick(()=>{
                    var img = $('.articleContent ').find('img')
                    for(var i = 0;i < img.length;i ++){
                        if($(img[i]).width()>window.screen.width){
                            $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
                        }else{
                            $(img[i]).css({'max-width': '100%','height': 'auto'})
                        }
                    }
                    var ue = UE.getEditor('editor');
                    var that = this;
                    ue.ready(function() {
                        ue.setContent(that.contentData.content);
                    });
                })
            }
        },
        getarticle(){
            console.log(this.setid)
            if(this.setid == '' || !this.setid){
                var ue = UE.getEditor('editor');
                ue.ready(function() {
                    ue.setContent('<p></p>');
                });
                return;
            }
            if(this.source == 'news'){
                Service.news().getNewsDetail({},this.setid).then(response => {
                    if(response.errorCode == 0){
                        if(response.data != null){
                            this.dealDetail(response.data)
                        }
                    }else{
                        this.$message.error(response.message)
                    }

                }, err => {
                });
            }else{
                Service.sys().getarticleDetail({},this.setid).then(response => {
                    if(response.errorCode == 0){
                        if(response.data != null){
                            this.dealDetail(response.data)
                        }
                    }else{
                        this.$message.error(response.message)
                    }
                }, err => {
                });
            }

        },
      getUEContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      }
    }
  }
</script>

<template>
    <div>
      <input type="file"
             style="display: none"
             ref="upload"
             :multiple="multiple"
             @change="changeImage($event)"
             accept="image/gif,image/jpeg,image/jpg,image/png">
      <div class="headImg" v-if="from === 'head'">
        <img :src="userUrl || userImageUrl" alt="" @click="uploadClick">
        <img :src="userImageUrl" alt="">
      </div>
      <div v-if="from === 'button' || from === 'logo'" style="border: 1px solid #e6a03c;border-radius: 3px;padding: 5px 12px;" @click="uploadClick('button')">
        {{text}}
      </div>
    </div>
</template>
<style>
</style>
<script>
  import userImageUrl from '../assets/icon/个人中心/camera.png'
  export default{
    props:{
      userUrl:'',
      text:'',
      multiple:{
        default:false
      },
      from:{
        default:'head'
      }
    },
    data(){
        return {
          baseFile:'',
          baseType:'',
          userImageUrl:userImageUrl
        }
    },
    methods:{
      uploadFile() {
        this.axios({
          method: 'post',
          url: '/api/back/uploadFile',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data:{
            baseFile:this.baseFile,
            baseType:this.baseType,
          },
        }).then((res) => {
          if (res.data.code == 200) {
            this.$emit('callBackUpload',{from:this.from,data:res.data.data})
          } else {
            this.$toast({
              message: res.data.msg || '请求出错',
              duration: 1000,
            });
          }
        }).catch((res) => {
          this.$toast({
            message: res.data.msg || '请求出错',
            duration: 1000,
          });
        })
      },
      fileReader(file){
        if(file) {
          let reader = new FileReader()
          let that = this
          reader.readAsDataURL(file)
          reader.onload= function(e){
            // 这里的this 指向reader
            that.baseFile = this.result;
            that.baseType = file.type.split('/')[1];
            that.uploadFile();
          }
        }
      },
      changeImage: function(e){
        let files = e.target.files;
        if(files.length>0){
          if(this.multiple){
            for(var i = 0;i<files.length;i++){
              this.fileReader(files[i]);
            }
          }else{
            this.fileReader(files[0]);
          }
        }

      },
      uploadClick(){
        this.$refs.upload.click();
      },
    },
    components: {
    }
  }
</script>

<template>
    <div>
      <input type="file"
             style="display: none"
             ref="upload"
             @change="changeImage($event)"
             accept="image/gif,image/jpeg,image/jpg,image/png">
      <div class="headImg" v-if="from === 'head'">
        <img :src="userUrl || userImageUrl" alt="" @click="uploadClick">
        <img :src="userImageUrl" alt="">
      </div>
      <div v-if="from === 'button'" style="border: 1px solid #e6a03c;border-radius: 3px;padding: 5px 12px;" @click="uploadClick('button')">
        {{text}}
      </div>
    </div>
</template>
<style>
</style>
<script>
  import userImageUrl from '../assets/icon/个人中心/camera.png'
  console.log(userImageUrl)
  export default{
    props:{
      userUrl:'',
      text:'',
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
            this.$emit('callBackUpload',res.data.data)
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
      changeImage: function(e){
        let file = e.target.files[0];
//          console.log(file)
        if(file) {
          this.file = file;
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
      uploadClick(){
        this.$refs.upload.click();
      },
    },
    components: {
    }
  }
</script>

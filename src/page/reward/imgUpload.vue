<!-- 图片上传界面 -->
<template>
  <div style="background: #fff;min-height: 100vh;">
    <div v-title>上传图片</div>
    <div class="imgs-box">
      <div v-for="(img,i) in imgs" class="img-wrapper">
        <img class="box-item img" :class="{uploading:img.uploading}" :src="img.url" :preview="i">
        <div class="remove-btn" v-show="!img.submited" @click="remove(i)">×</div>
      </div>
      <el-upload action="" class="upload-demo" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
        <div class="add-btn box-item" slot="trigger" v-show="imgs.length <8">+</div>
      </el-upload>
    </div>
    <div class="submit-btn" @click="submit">发布图片</div>
  </div>
</template>
<script>
const acceptType = ['image/png', 'image/jpg', 'image/jpeg'];
import { MessageBox } from 'mint-ui';
export default {
  name: '',
  data() {
    return {
      imgs: [],
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      if(userMsg === undefined){
        this.$router.push('/login');
      }
    })
  },
  methods: {
    remove(i) {
      this.imgs.splice(i, 1);
    },
    async submit() {
      if (this.imgs.length === 0) {
        return;
      }
      const userMsg = JSON.parse(window.localStorage.getItem('userMsg'));
      const officeId = JSON.parse(window.localStorage.getItem('officeId'));
      //上传，调上传接口
      this.imgs.forEach(async img => {
        img.uploading = true;
        img.submited = true;
        const { data } = await this.axios.post('/api/back/uploadFile',{
          baseFile:img.url,
          baseType:img.type,
        })
        const { data:result } = await this.axios.post('/api/h5/myOfficeUpload', {
          officeId: officeId,
          userId: userMsg.users.userId,
          uploadImg: data.data,
        })
        img.uploading = false;
        img.success = (result.code === 200);
        if (!img.success) {
          MessageBox.alert('上传失败!');
          return;
        }
      })
      MessageBox.alert('上传成功!').then(() => {
        this.$router.back();
      });
    },
    handleChange(f) {
      const type = f.raw.type;
      if (!acceptType.includes(type)) {
        MessageBox.alert('只支持png和jpg格式的图片', '提示');
        return;
      }
      const size = f.size;
      if (size > 2000000) {
        MessageBox.alert('图片大小不得2M', '提示');
        return;
      }
      const event = event || window.event;
      const file = event.target.files[0];
      const reader = new FileReader();
      //转base64
      reader.onload = e => {
        this.imgs.push({
          url: e.target.result,
          uploading: false,
          success: null,
          type:type.replace('image/',''),
        }); //将图片路径赋值给src
        this.$previewRefresh();
      }
      reader.readAsDataURL(file);
    },
  },
  computed: {

  },

}

</script>
<style scoped lang='scss'>
@import '~@/styles/imgUpload.scss';

</style>

<template>
  <div class="more-info">
    <div v-title>{{title}}</div>
    <div class="list-content">
      <div v-for="(item, index) in dataList"  :key="index" @click="toDetail(item.articleUrl)" style="height:1.633rem;">
        <img :src="item.articleImage" class="list-img">
        <div class="list-names">   
          <span class="list-des">{{item.articleTitle}}</span>
          <span class="list-content-desc">{{item.articleDes}}</span>
        </div>
        
      </div>
    </div>
  </div>
  
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name:"moreinfo",
  data(){
    return{
      dataList:[],
      title:""
    }
  },
  created(){
    this.getData();
   
  },
  methods:{
    toDetail(url){
      window.location.href=url;
    },
     getData() {
       const classId = JSON.parse(window.localStorage.getItem('classId'));
        this.title = window.localStorage.getItem('className')
      this.axios({
        method: 'post',
        url: '/api/h5/getMoreArticleList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          articleClass:classId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.dataList = res.data.data;
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
  }
}
</script>
<style lang="less" scoped>
.more-info{
  background: #fff;
  height: 100vh;
}
.list-content{
  padding: 20px;
  background:#fff;
  border-bottom: 1px solid #f5f5f9;
  .list-img{
    width: 2.133rem;
    height: 1.333rem;
  }
  .list-names{
    vertical-align: top;
    display: inline-block;
    width: 72%;
    font-size: 0.32rem;
    margin-left: 10px;

  .list-des{
    color: #323232;
    font-weight: bold;
    display: block;
  }
  .list-content-desc{
    color: #969696;
    position: relative;
    display: inline-block;
    height: 0.9rem;
    overflow: hidden;
    margin-top: 0.1rem;
    overflow:hidden;
    text-overflow: ellipsis;//显示省略号
    display:-webkit-box;
    -webkit-line-clamp:2;//块元素显示的文本行数
    -webkit-box-orient:vertical;
  }
  }

}
</style>


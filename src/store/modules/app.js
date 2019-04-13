import {Toast} from 'mint-ui'
export default {
  state:{
    headContent:'',
  },
  mutations:{
    showToast(state,data){
      console.log(data)
      Toast({
        message: data,
        duration: 1000,
      });
    }
  },
  actions:{

  }
}

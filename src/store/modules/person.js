export default {
  namespaced: true,
  state: {
    addressEditType:'add',
    editingAddress:null,
    chosenAddress:null,
    isSubmitSuccess:false,
  },
  mutations: {
   setAddressEditType(state, type){
    state.addressEditType = type;
   },
   setEditingAddress(state, address){
    state.editingAddress = address;
   },
   setChosenAddress(state, address){
    state.chosenAddress = address;
   },
   setSubmitSuccess(state, isSubmitSuccess){
    state.isSubmitSuccess = isSubmitSuccess;
   }
  },
  actions: {

  },
  getters: {

  }
}
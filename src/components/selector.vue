<template>
    <div>
      <div style="padding:0 10px;display: flex;font-size: 16px;color: #2c3e50;height: 48px;align-items: center;">
        <div style="width: 105px;flex: none;">{{label}}</div>
        <div style="flex:1;box-sizing: border-box;" @click="select">
          <div style="border-bottom: 1px solid #f5f5f9;color: #000;">
            {{seleValue.name}}{{seleValueChildren?' '+seleValueChildren.name + '  ':''}}{{seleValueChildren2?seleValueChildren2.name:''}}
          </div>
        </div>
      </div>
      <mt-datetime-picker
        v-if="type === 'userBrith'"
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate="startDate"
        :endDate="endDate"
        :value="value"
      >
      </mt-datetime-picker>
      <mt-popup
        style="width: 100%"
        v-if="type !== 'userBrith'"
        v-model="popupVisible"
        position="bottom"
        popup-transition="popup-fade">
          <mt-picker :slots="slots"  value-key="name" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
</template>
<style>
</style>
<script>
    export default{
        props:{
          type:'',
          label:'',
          seleValuePro:'',
          seleValueChildrenPro:'',
          seleValueChildren2Pro:'',
          option:'',
          defaultIndexPro:0,
          defaultIndexChildPro:0,
          defaultIndexChildAfterPro:0,
        },
        data(){
          return {
            seleValue:'',
            seleValueChildren:'',
            seleValueChildren2:'',
            seleValueChild:'',
            startDate: new Date('1968-1-1'),
            endDate: new Date(),
            value:new Date('1990-1-1'),
            popupVisible:false,
            slots:[{
              flex: 1,
              defaultIndex:3,
              values: [4,5,6],
              className: 'slot1',
              textAlign: 'center'
            }]
          }
        },
        methods:{
          onValuesChange (picker, values) {
              let town = [];
             this.seleValue = values[0];
              if(this.type !== 'userCity'){
                this.$emit('changeValue',{type:this.type,value:values[0].name});
              }else{
                this.seleValueChildren = values[1];
                this.seleValueChildren2 = values[2]
                this.$emit('changeValue',{type:'userProvince',value:values[0].name});
                this.$emit('changeValue',{type:'userCity',value:values[1].name});
                this.$emit('changeValue',{type:'userArea',value:values[2].name});
                picker.setSlotValues(1, values[0].children);
                if (values[1]) {
                  town = values[1].children
                }
                picker.setSlotValues(2, town)
              }
          },
          select(){
            this.popupVisible = true;
            if(this.type == 'userBrith'){
              this.$refs.picker.open()
            }
          },
          handleConfirm (data) {
            const time = new Date(data);
            this.seleValue = {name:time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDay()}
            console.log(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDay())
          },
        },
        created(){

          this.seleValue = this.seleValuePro;
          if(this.type == 'userBrith'){

            return
          }
          this.slots[0].defaultIndex = this.defaultIndexPro;
          this.slots[0].values = this.option;
          if(this.type == 'userCity'){
            this.seleValueChildren2 = this.seleValueChildren2Pro;
            this.seleValueChildren = this.seleValueChildrenPro;
            this.slots = [{
                flex: 1,
                values: this.option,
                defaultIndex: this.defaultIndexPro,
                className: 'slot1',
                textAlign: 'center'
              }, {
                divider: true,
                content: '-',
                className: 'slot2'
              }, {
                flex: 1,
                values: this.option[0].children,
                defaultIndex: this.defaultIndexChildPro,
                className: 'slot3',
                textAlign: 'center'
              }, {
                divider: true,
                content: '-',
                className: 'slot4'
              }, {
                flex: 1,
                values: this.option[0].children[0].children,
                defaultIndex: this.defaultIndexChildAfterPro,
                className: 'slot5',
                textAlign: 'center'
              }
            ]
          }
        },
    }
</script>

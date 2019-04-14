<template>
  <div class="person-index">
    <!-- 每个页面的地址栏title更改部分 -->
    <div v-title>个人中心</div>
    <div v-if="isLogin">
      <!-- 已登录 -->
      <div v-if="isCompanyUser">
        <!-- 企业用户 -->
        <div class="person-bgm">
          <img  class="person-bgm-img" src="@/assets/person/login.png" alt="">
          <div class="person-info">
            <el-row type="flex" class="row-bg" justify="space-between" style="margin: 0; padding-left: 10px; text-align: left">
              <el-col :span="6">
                <span v-if="isInfo"  class="weiqiandao">
                  已入驻
                </span>
                <span v-else class="qiandao"  @click="showDetail('apply')">
                  未入驻
                </span>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6" style="padding-right: 10px; text-align: right; font-size: 0.3rem">
                <span @click="editorMsg()">修改资料</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: 0">
              <div>
                <el-col :span="12" :offset="6">
                  <div>
                    <img :src="companyUserInfo.userHeadImage" alt="" class="person-unlogin" v-if="companyUserInfo.userHeadImage">
                    <img src="@/assets/login/user.png" alt="" class="person-unlogin" v-else>
                  </div>
                  <div>
                    {{this.companyUserInfo.companyName}}
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <div class="person-info-num">
            <el-row style="margin: 0">
              <el-col :span="12">
                <div style="font-size: 0.3rem">
                  总资产
                </div>
                <div style="font-size: 0.6rem">
                  {{this.companyUserInfo.userTotal | numfilter}}
                </div>
              </el-col>
              <el-col :span="12">
                <div >
                  <div style="font-size: 0.3rem">
                    账户余额
                  </div>
                  <div style="font-size: 0.6rem">
                    {{this.companyUserInfo.userBlanace | numfilter}}
                  </div>
                </div>
                
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="person-two">
          <el-row style="margin: 0">
            <el-col :span="12">
              <div @click="showDetail('userInte')">
                <div style="font-size: 0.6rem">
                  {{this.companyUserInfo.userInte || 0}}
                </div>
                <div style="font-size: 0.3rem">
                  可用积分
                </div>
              </div>
              
                
            </el-col>
            <el-col :span="12">
              <div @click="showDetail('eco')">
                <div style="font-size: 0.6rem">
                  {{this.companyUserInfo.userName || '无'}}
                </div>
                <div style="font-size: 0.3rem">
                  经纪人
                </div>
              </div>
              
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <!-- 个人用户 -->
        <div class="person-bgm">
          <img  class="person-bgm-img" src="@/assets/person/login.png" alt="">
          <div class="person-info">
            <el-row type="flex" class="row-bg" justify="space-between" style="margin: 0; padding-left: 10px; text-align: left">
              <el-col :span="6">
                <span v-if="!isQian" class="qiandao" @click="setQian()">
                  签到
                </span>
                <span v-else class="weiqiandao">
                  已签到
                </span>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="6" style="padding-right: 10px; text-align: right; font-size: 0.3rem">
                <span @click="editorMsg()">修改资料</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: 0">
              <div>
                <el-col :span="12" :offset="6">
                  <div>
                    <img :src="personUserInfo.userImageUrl" alt="" class="person-unlogin" v-if="personUserInfo.userImageUrl">
                    <img src="@/assets/login/user.png" alt="" class="person-unlogin" v-else>
                  </div>
                  <div>
                    {{this.personUserInfo.nickName}}
                  </div>
                </el-col>
              </div>
            </el-row>
          </div>
          <div class="person-info-num">
            <el-row style="margin: 0">
              <el-col :span="8">
                <div style="font-size: 0.3rem">
                  总资产
                </div>
                <div style="font-size: 0.6rem">
                  {{this.personUserInfo.totalAsset | numfilter}}
                </div>
              </el-col>
              <el-col :span="8">
                <div @click="showDetail('pay')">
                  <div style="font-size: 0.3rem">
                    预计奖励
                  </div>
                  <div style="font-size: 0.6rem">
                    {{this.personUserInfo.payAmount | numfilter}}
                  </div>
                </div>
                
              </el-col>
              <el-col :span="8">
                <div >
                  <div style="font-size: 0.3rem">
                    账户余额
                  </div>
                  <div style="font-size: 0.6rem">
                    {{this.personUserInfo.userBalance | numfilter}}
                  </div>
                </div>
                
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="person-two">
          <el-row style="margin: 0">
            <el-col :span="12">
              <div @click="showDetail('userInte')">
                <div style="font-size: 0.6rem">
                  {{this.personUserInfo.userInte || 0}}
                </div>
                <div style="font-size: 0.3rem">
                  可用积分
                </div>
              </div>
              
                
            </el-col>
            <el-col :span="12">
              <div @click="showDetail('eco')">
                <div style="font-size: 0.6rem">
                  {{this.personUserInfo.ecoName || '无'}}
                </div>
                <div style="font-size: 0.3rem">
                  经纪人
                </div>
              </div>
              
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- 未登录 -->
      <div class="person-bgm">
        <img  class="person-bgm-img" src="@/assets/person/unlogin.png" alt="">
        <div class="person-info">
          <el-row :gutter="20" style="margin: 0">
            <div @click="jumpto('login')">
              <el-col :span="12" :offset="6">
                <div>
                  <img src="@/assets/login/user.png" alt="" class="person-unlogin">
                </div>
                <div>
                  点击登录
                </div>
              </el-col>
            </div>
            
          </el-row>
        </div>
        <div class="person-info-num">
          <el-row style="margin: 0">
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                总资产
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                预计奖励
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
            <el-col :span="8">
              <div style="font-size: 0.3rem">
                账户余额
              </div>
              <div style="font-size: 0.6rem">
                0
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="person-two">
        <el-row style="margin: 0">
          <el-col :span="12">
            <div @click="unLogin()">
              <div style="font-size: 0.6rem">
                0
              </div>
              <div style="font-size: 0.3rem">
                可用积分
              </div>
            </div>
            
              
          </el-col>
          <el-col :span="12">
            <div @click="unLogin()">
              <div style="font-size: 0.6rem">
                无
              </div>
              <div style="font-size: 0.3rem">
                经纪人
              </div>
            
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="isLogin">
      <div v-if="isCompanyUser">
        <div class="person-list">
          <el-row :gutter="24" type="flex"  justify="center" style="margin: 0">
            <el-col :span="4" style="padding: 0">
              <div @click="jumpTo('/recruitment')">
                <div>
                  <img src="@/assets/person/guanzhuqiye.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  我的招聘
                </div>
              </div>
              
            </el-col>
            <el-col :span="4" style="padding: 0">
              <!-- <div v-if="isInfo"> -->
                <!-- <div @click="showDetail('pushWork')">
                  <div>
                    <img src="@/assets/person/shop.png" alt="" class="person-list-img">
                  </div>
                  <div style="font-size: 0.3rem;">
                    职位发布
                  </div>
                </div>
              </div>
              <div v-else> -->
                <div @click="showDetail('apply')">
                  <div>
                    <img src="@/assets/person/shop.png" alt="" class="person-list-img">
                  </div>
                  <div style="font-size: 0.3rem;">
                    我要入驻
                  </div>
                </div>
              <!-- </div> -->
              
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="jumpTo('/person/message')">
                <div>
                  <img src="@/assets/person/msg.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  消息中心
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="showDetail('tixian')">
                <div>
                  <img src="@/assets/person/tixian.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  提现
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="jumpTo('/person/suggest')">
                <div>
                  <img src="@/assets/person/suggest.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  意见反馈
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <div class="person-list">
          <el-row :gutter="24" type="flex"  justify="center" style="margin: 0">
            <el-col :span="4" style="padding: 0">
              <div @click="jumpTo('/person/focusCompany')">
                <div>
                  <img src="@/assets/person/guanzhuqiye.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  关注企业
                </div>
              </div>
              
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="jumpto('person/myshop')">
                <div>
                  <img src="@/assets/person/shop.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  我的小店
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="jumpTo('/person/message')">
                <div>
                  <img src="@/assets/person/msg.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  消息中心
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="showDetail('tixian')">
                <div>
                  <img src="@/assets/person/tixian.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  提现
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="padding: 0">
              <div @click="jumpTo('/person/suggest')">
                <div>
                  <img src="@/assets/person/suggest.png" alt="" class="person-list-img">
                </div>
                <div style="font-size: 0.3rem;">
                  意见反馈
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="person-list">
        <el-row :gutter="24" type="flex"  justify="center" style="margin: 0">
          <el-col :span="4" style="padding: 0">
            <div @click="jumpTo('/person/focusCompany')">
              <div>
                <img src="@/assets/person/guanzhuqiye.png" alt="" class="person-list-img">
              </div>
              <div style="font-size: 0.3rem;">
                关注企业
              </div>
            </div>
            
          </el-col>
          <el-col :span="4" style="padding: 0">
            <div @click="jumpto('person/myshop')">
              <div>
                <img src="@/assets/person/shop.png" alt="" class="person-list-img">
              </div>
              <div style="font-size: 0.3rem;">
                我的小店
              </div>
            </div>
          </el-col>
          <el-col :span="4" style="padding: 0">
            <div @click="jumpTo('/person/message')">
              <div>
                <img src="@/assets/person/msg.png" alt="" class="person-list-img">
              </div>
              <div style="font-size: 0.3rem;">
                消息中心
              </div>
            </div>
          </el-col>
          <el-col :span="4" style="padding: 0">
            <div>
              <div>
                <img src="@/assets/person/tixian.png" alt="" class="person-list-img">
              </div>
              <div style="font-size: 0.3rem;">
                提现
              </div>
            </div>
          </el-col>
          <el-col :span="4" style="padding: 0">
            <div @click="jumpTo('/person/suggest')">
              <div>
                <img src="@/assets/person/suggest.png" alt="" class="person-list-img">
              </div>
              <div style="font-size: 0.3rem;">
                意见反馈
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    
    <div class="index-foot">
      <div>
        站点地图
      </div>
      <div style="margin-bottom: 10px;">
        37打工网-转为打工者服务的招工招聘信息平台
      </div>
      <div>
        37打工网 37HR.COM ©2012-2017
      </div>
      <div>
        苏州叁柒汇信息技术服务有限公司版权所有
      </div>
      <div>
        苏ICP备17027824号-
      </div>
      <div style="margin-top: 20px;">
        真的没有了！
      </div>
      <div>
        <el-button type="danger" style="width: 100%" @click="logout()">退出登录</el-button>
      </div>
    </div>


    <el-dialog
      title="积分明细"
      :visible.sync="userInteDialogVisible"
      width="90%"
      center
      >
      <div>
        <div v-if="inteList.length == 0">
          暂无积分记录
        </div>
        <div v-else>
          <el-table
            :data="inteList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="inteType"
              label="来源"
              align="center"
              >
              <template slot-scope="scope">
                {{scope.row.inteType | inteType}}
              </template>
            </el-table-column>
            <el-table-column
              prop="inteValue"
              align="center"
              label="积分">
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="时间">
              <template slot-scope="scope">
                {{scope.row.inteTime | time}}
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userInteDialogVisible = false" style="background: #e6a03c; border: none">知道了</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="我的经纪人"
      :visible.sync="ecoDialogVisible"
      width="90%"
      center
      >
      <div>
        <div v-if="isCompanyUser">
          <div v-if="this.companyUserInfo.userName">
            {{this.companyUserInfo.userName}}
            <el-row style="margin: 0">
              <el-col :span="12">{{this.companyUserInfo.userName}}</el-col>
              <el-col :span="12" style="color: #e6a03c">{{this.companyInfo.userPhone}}</el-col>
            </el-row>
            <el-row style="margin: 0">
              <el-col :span="12">拨打免费电话</el-col>
              <el-col :span="12" style="color: #e6a03c; margin-top: 0.3rem">400-139-3637</el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row style="margin: 0">
              <el-col :span="12">拨打免费电话</el-col>
              <el-col :span="12" style="color: #e6a03c">400-139-3637</el-col>
            </el-row>
          </div>
        </div>
        <div v-else>
          <div v-if="this.personUserInfo.ecoName">
            <el-row style="margin: 0">
              <el-col :span="12">{{this.personUserInfo.ecoName}}</el-col>
              <el-col :span="12" style="color: #e6a03c">{{this.personUserInfo.ecoPhone}}</el-col>
            </el-row>
            <el-row style="margin: 0; margin-top: 0.3rem">
              <el-col :span="12">拨打免费电话</el-col>
              <el-col :span="12" style="color: #e6a03c">400-139-3637</el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row style="margin: 0">
              <el-col :span="12">拨打免费电话</el-col>
              <el-col :span="12" style="color: #e6a03c">400-139-3637</el-col>
            </el-row>
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ecoDialogVisible = false" style="background: #e6a03c; border: none">知道了</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提现"
      :visible.sync="tixianDialogVisible"
      width="90%"
      center
    >
      <div>
        <div style="color: #e6a03c; font-size: 0.2rem">
          注：请认真填写提现资料
        </div>
        <el-form ref="form" :model="tixianForm" label-width="80px">
          <el-form-item label="持卡人">
            <el-input v-model="tixianForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="tixianForm.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="tixianForm.certNo"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="tixianForm.bankNo"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="tixianForm.bankName"></el-input>
            <div style="color: #e6a03c; font-size: 0.2rem">
              如：招商银行北京万寿路支行
            </div>
          </el-form-item>
        </el-form>
        <div >
          <div style="font-size: 0.32rem">
            提现记录
          </div>
          <el-table
            :data="tixianHistory"
            style="width: 100%">
            <el-table-column
              prop="cashAmount"
              >
            </el-table-column>
            <el-table-column
              prop="orderStatus"
              >
              <template slot-scope="scope">
                {{scope.row.orderStatus | time}}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              >
              <template slot-scope="scope">
                {{scope.row.createTime | time}}
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTixian()" style="background: #e6a03c; border: none">确认提交</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="预计奖励"
      :visible.sync="payDialogVisible"
      width="90%"
      center
      >
      <div>
        <div v-if="payList.length == 0">
          暂无奖励记录
        </div>
        <div v-else>
          <el-table
            :data="payList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="orderType"
              label="来源"
              align="center"
              >
              <template slot-scope="scope">
                {{scope.row.orderType | orderType}}
              </template>
            </el-table-column>
            <el-table-column
              prop="onAmount"
              align="center"
              label="金额（元）">
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="预计获得时间">
              <template slot-scope="scope">
                {{scope.row.inteTime | time}}
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="payDialogVisible = false" style="background: #e6a03c; border: none">知道了</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="我要入驻"
      :visible.sync="applyDIalogVisible"
      width="90%"
      center
      >
      <div>
        <el-form ref="form" :model="applyForm" label-width="80px">
          <el-form-item label="企业名称">
            <el-input v-model="applyForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="营业执照">
            <el-upload
              class="avatar-uploader"
              action="https://jaf"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img v-if="applyForm.companyTaxImage" :src="applyForm.companyTaxImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyDIalogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitApply()" style="background: #e6a03c; border: none">提交申请</el-button>
      </span>
    </el-dialog>

    
    <tabbar tarname="person" :iconarr="iconArr"></tabbar>
  </div>
</template>
<script>
import tabbar from '@/components/tabbar'
import { MessageBox } from 'mint-ui'
import moment from 'moment'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      iconArr: ['../../static/index/1.png', '../../static/index/2.png', '../../static/index/3-check.png'],
      isLogin: false,
      isCompanyUser: false,
      user: {},
      personUserInfo: {},
      companyUserInfo: {},
      isQian: false,
      isInfo: false,
      userInteDialogVisible: false,
      inteList: [],
      ecoDialogVisible: false,
      tixianDialogVisible: false,
      tixianForm: {
        certNo: '',
        userPhone: '',
        bankNo: '',
        bankName: '',
        userName: ''
      },
      tixianHistory: [],
      payDialogVisible: false,
      payList: [],
      applyDIalogVisible: false,
      applyForm: {
        userId: '',
        companyTaxImage: ''
      }
    }
  },
  components: {tabbar},
  filters: {
    time: (value) => {
      return moment(value).format('YYYY-MM-DD')
    },
    numfilter: (num) => {
      if (num) {
        var num = (+num || 0).toString(), result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result
        } else {
          return 0
        }
      },
    inteType: (value) => {
      let text = ''
      switch (value) {
        case '0': 
          text = '每日签到'
          break
        case '1': 
          text = '邀请一人'
          break
        case '2': 
          text = '意见反馈同意'
          break
        case '3': 
          text = '入职奖励'
          break
        default: 
          text = ''
      }

      return text
    },
    orderType: (value) => {
      let text = ''
      switch (value) {
        case '0': 
          text = '入职'
          break
        case '1': 
          text = '推荐'
          break
        default: 
          text = ''
      }

      return text
    },
    tixianStatus: (value) => {
      let text = ''
      switch (value) {
        case '0': 
          text = '审核中'
          break
        case '1': 
          text = '审核失败'
          break
        case '2': 
          text = '审核成功'
          break
        default: 
          text = ''
      }

      return text
    }
      
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
      this.isLogin = true
      this.user = JSON.parse(window.localStorage.getItem('userMsg')).users
      if (this.user.loginType == 'person') {
        this.isCompanyUser = false
        this.getUserMsg(0)
        this.isQiandao()
      } else {
        this.isCompanyUser = true
        this.getUserMsg(1)
      }

    } else {
      this.isLogin = false
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      var testmsg=file.name.substring(file.name.lastIndexOf('.'))				
      let typeArr = ['.png', '.jpg', '.jpeg']
      if (typeArr.indexOf(testmsg) > -1) {
        // 上传文件地址，然后赋值给fileForm.waterFile
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let _base64 = reader.result

          this.axios({
            method: 'post',
            url: '/api/back/uploadFile',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              baseFile: _base64,
              baseType: testmsg.substring(1)
            }
          }).then((res) => {
            if (res.data.code == 200) {
              this.applyForm.companyTaxImage = res.data.data
            } else {
              this.$message.error('上传失败，请重试')
            }
          }).catch(() => {
            this.$message.error('上传失败，请重试')
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '抱歉，您上传的格式不符合要求或上传图片已够8张'
        })
        return 
      }
    },
    showDetail(data) {
      if (data == 'userInte') {
        this.userInteDialogVisible = true
        this.axios({
          method: 'post',
          url: '/api/h5/getInteList',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id
          }
        }).then((res) => {
          if (res.data.code == 200 && res.data.data) {
            let data = res.data.data
            for (let i = 0; i < data.length; i++) {
              data[i].index = i + 1
            }
            console.log(data)
            this.inteList = data
          }
        }).catch((res) => {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        })
      } else if (data == 'eco') {
        this.ecoDialogVisible = true
      } else if (data == 'tixian') {
        this.tixianDialogVisible = true
        this.axios({
          method: 'post',
          url: '/api/h5/getCashLog',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id
          }
        }).then((res) => {
          if (res.data.code == 200 && res.data.data) {
            if (res.data.data.logList) {
              this.tixianHistory = res.data.data.logList
            }

            if (res.data.data.userInfo) {
              this.tixianForm = res.data.data.userInfo
            }
            
          }
        }).catch((res) => {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        })
      } else if (data == 'pay') {
        this.payDialogVisible = true

        this.axios({
          method: 'post',
          url: '/api/h5/getBackOrderList',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id
          }
        }).then((res) => {
          if (res.data.code == 200 && res.data.data) {
            let data = res.data.data
            for (let i = 0; i < data.length; i++) {
              data[i].index = i + 1
            }
            this.payList = data
          }
        }).catch((res) => {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        })
      } else if (data == 'apply') {
        if (this.isInfo) {
          this.$message({
            message: '您当前已经入驻',
            type: 'success'
          })
        } else {
          this.applyDIalogVisible = true
        }
        
      } else if (data == 'pushWork') {
        
      }
    },
    submitTixian() {
      this.axios({
        method: 'post',
        url: '/api/h5/commitCash',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id,
          bankNo: this.tixianForm.bankNo,
          bankName: this.tixianForm.bankName
        }
      }).then((res) => {
        if (res.data.code == 200 && res.data.data) {
          this.$message({
            message: '恭喜你，提现已提交',
            type: 'success'
          })
          
          
        } else {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        }
        this.tixianDialogVisible = false
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
        this.tixianDialogVisible = false
      })
    },
    submitApply() {
      this.axios({
        method: 'post',
        url: '/api/h5/commitCompanyApply',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.loginType == 'person' ? this.user.userId : this.user.company_user_id,
          companyTaxImage: this.applyForm.companyTaxImage
        }
      }).then((res) => {
        if (res.data.code == 200 && res.data.data) {
          this.$message({
            message: '恭喜你，申请已提交',
            type: 'success'
          })
          
          
        } else {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        }
        this.applyDIalogVisible = false
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
        this.tixianDialogVisible = false
      })
    },
    unLogin() {
      Toast({
        message: '您还未登录',
        iconClass: 'fa fa-remove fa-5x'
      });
    },
    jumpTo(data) {
      if (window.localStorage.getItem('userMsg')) {
        this.$router.push({
          path: data
        })
      } else {
        Toast({
          message: '您还未登录',
          iconClass: 'fa fa-remove fa-5x'
        });
      }
    },
    editorMsg() {
      if (this.user.loginType == 'person') {
        this.$router.push({
          path: '/editPerson'
        })
      } else {
        this.$router.push({
          path: '/editCompany'
        })
      }
    },
    isQiandao() {
      this.axios({
        method: 'post',
        url: '/api/h5/getSignDetail',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: this.user.userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.isQian = res.data.data.isSign
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    jumpto(data) {
      this.$router.push({
        path: `/${data}`
      })
    },
    getUserMsg(data) {
      let url = data == 0 ? '/api/h5/getMyCenter' : '/api/h5/getCompanyCenter'
      this.axios({
        method: 'post',
        url: url,
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userId: data == 0 ? this.user.userId : this.user.company_user_id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          if (data == 0) {
            this.personUserInfo = res.data.data
          } else {
            this.companyUserInfo = res.data.data.companyInfo
            this.isInfo = res.data.data.isInfo
          }
        }
      }).catch((res) => {
        MessageBox({
          title: '小提示',
          message: res.data.msg,
        })
      })
    },
    setQian() {
      this.$router.push({
        path: '/person/sign'
      })
    },
    logout() {
      window.localStorage.removeItem('userMsg')
      Toast({
        message: '退出成功',
        iconClass: 'icon icon-success'
      })
      setTimeout(() => {
        this.$router.push({
          path: '/login'
        })
      }, 1500);
    }
  }
}
</script>
<style lang="less" scoped>
.person-bgm {
  position: relative;
  width: 100%;
  color: #fff;
  .person-bgm-img {
    width: 100%;
    display: block;
  }
  .person-info {
    width: 100%;
    position: absolute;
    text-align: center;
    font-size: 0.4667rem;
    bottom: 1.8rem;
    .person-unlogin {
      width: 2rem;
      height: 2rem;
      background: #fff;
      border-radius: 50%;
      margin-bottom: 0.2667rem;
    }
  }
  .person-info-num {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
    padding-bottom: 10px;
  }
}
.person-two {
  background: #fff;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #e6a03c;
}
.person-list {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  text-align: center;
  .person-list-img {
    width: 1rem;
    height: 1rem;
  }
  
}

.index-foot {
  color: #969696;
  line-height: 20px;
  text-align: center;
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
}

.qiandao {
  display: inline-block;
  background: #e6a03c;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 0.3rem
}
.weiqiandao {
  display: inline-block;
  background: #969696;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 0.3rem
}

</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>



<template>
  <div class="sign-body">
    <div v-title>我要报名</div>
    <div>
      <div class="sign-box">
        <img src="@/assets/sign/sign.png" alt class="sign-img">
      </div>
      <div class="sign-content">
        <h2 style="font-size: 0.4rem">报名成功</h2>
        <p>亲，您的专属经纪人小姐姐会在24小时内联系您，请保持手机畅通哦！</p>
      </div>
      <div id="sign-can">
        <div class="bjc">萌赚送你1.5</div>
        <canvas v-if="!hasDraw" id="myCanvas" class="guaCanvas" width="240" height="140"></canvas>
      </div>
      <div class="canvas-box"></div>
      <div class="button-start" v-if="!hasDraw">
        <el-button  type="danger" round @click="startDraw()">开始刮奖</el-button>
      </div>
      <el-button type="warning" @click="telDialogVisiable = true" class="chat-pri">免费咨询</el-button>
    </div>
    <el-dialog
      
      :visible.sync="dialogSup"
      width="100%"
      >
      <div class="dialog-content">
        <img src="@/assets/sign/jia.png" alt="" class="dialog-img">
        <el-button type="danger" round @click="jumpto()" class="start-use">开始使用</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="免费咨询"
      :visible.sync="telDialogVisiable"
      width="90%"
      center
      class="tel"
      >
      <div>
        <el-row style="margin: 0; text-align: center">
          <el-col :span="24">拨打免费电话</el-col>
          
        </el-row>
        <el-row style="margin: 0; margin-top: 0.3rem; text-align: center">
          <a href="tel:400-139-3637" style="color: #e6a03c; text-decoration: none ">400-139-3637</a>
        </el-row>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="telDialogVisiable = false" style="background: #e6a03c; border: none">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogSup: false,
      hasDraw: false,
      telDialogVisiable: false
    };
  },
  created() {
    if (window.localStorage.getItem('signCanvas')) {
      this.hasDraw = true
      
    }
  },
  mounted() {
    this.signCan();
  },
  methods: {
    startDraw() {
    },
    signCan() {
      let me = this
      if (!this.hasDraw) {}
      var clientWidth = document.documentElement.clientWidth;
      if (clientWidth * 1 > 0) {
        document.querySelector("#sign-can .bjc").style.left =
          (clientWidth - 240) / 2 + "px";
        document.querySelector("#sign-can .guaCanvas").style.left =
          (clientWidth - 240) / 2 + "px";
      }

      // 得到画笔
      var cvs = document.getElementById("myCanvas"),
        ctx = cvs.getContext("2d"),
        touchRadius = 10; // 默认手指触摸半径，可以自定义设置

      // 默认填充灰色来遮住文字
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, 0, 240, 240); // fillRect，用矩形填充
      ctx.font = "15px arial";
      ctx.fillStyle = "white";
      ctx.fillText("您获得1次刮奖机会", 56, 100);

      // 画园的方法
      // @param { integer } 圆心的x坐标
      // @param { integer } 圆心的y坐标
      // @param { integer } 圆心半径
      // @param { string } 填充的颜色（本例中会通过其余代码设置为‘透明’，所以这个设置可以忽略）
      var fillCircle = function(x, y, radius, fillColor) {
        this.fillStyle = fillColor || "#eee";
        this.beginPath();
        this.moveTo(x - 90, y - 350);
        this.arc(x - 90, y - 350, radius, 0, Math.PI * 2, false); // 标准画圆
        this.fill();
      };

      // 得到涂抹的百分比
      var getTransparentPercent = function(ctx, width, height) {
        var imgData = ctx.getImageData(0, 0, width, height), // 得到canvas的像素信息
          pixles = imgData.data,
          transPixs = [];
        for (var i = 0, j = pixles.length; i < j; i += 4) {
          // 因为存储的结构为[R, G, B, A]，所以要每次跳4个长度
          var a = pixles[i + 3]; // 拿到存储alpha通道的值
          if (a === 0) {
            // alpha通道为0，就代表透明
            transPixs.push(i);
          }
        }
        return ((transPixs.length / (pixles.length / 4)) * 100).toFixed(2);
      };

      // 需要判断是PC还是手机
      var device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent.toLowerCase()
        ),
        clickEvtName = device ? "touchstart" : "mousedown",
        moveEvtName = device ? "touchmove" : "mousemove";

      // 判断是不是开始触摸等
      if (!device) {
        var isMouseDown = false;
        document.addEventListener(
          "mouseup",
          function(e) {
            isMouseDown = false;
          },
          false
        );
      } else {
        document.addEventListener(
          "touchmove",
          function(e) {
            if (isMouseDown) {
              e.preventDefault();
            }
          },
          false
        );
        document.addEventListener(
          "touchend",
          function(e) {
            isMouseDown = false;
            if (+getTransparentPercent(ctx, 240, 140) > 40) {
              window.localStorage.setItem('signCanvas', '1')
              me.dialogSup = true
            }
          },
          false
        );
      }

      // 开始移动
      cvs.addEventListener(
        clickEvtName,
        function(e) {
          isMouseDown = true;
          var x = device ? e.touches[0].clientX : e.clientX;
          var y = device ? e.touches[0].clientY : e.clientY;
          ctx.globalCompositeOperation = "destination-out"; // 关键部分，描述当在canvas上再次绘画时候的情况，这个设置便是之前所说的透明
          fillCircle.call(ctx, x, y, touchRadius);
          console.log("当前涂抹比例为：" + getTransparentPercent(ctx, 240, 140));
        },
        false
      );

      // 移动中
      cvs.addEventListener(
        moveEvtName,
        function(e) {
          if (!device && !isMouseDown) {
            return false;
          }
          var x = device ? e.touches[0].clientX : e.clientX;
          var y = device ? e.touches[0].clientY : e.clientY;
          ctx.globalCompositeOperation = "destination-out";
          fillCircle.call(ctx, x, y, touchRadius);
          console.log("当前涂抹比例为：" + getTransparentPercent(ctx, 240, 140));
        },
        false
      );
    },
    jumpto() {
      this.$router.push({
        path: '/bargain'
      })
    }
  }
};
</script>
<style lang="less" scoped>
.sign-box {
  text-align: center;
  padding-top: 2rem;
  .sign-img {
    width: 3rem;
    height: 3rem;
  }
}
.sign-content {
  text-align: center;
  padding: 1rem;
}
#sign-can .bjc {
  color: black;
  height: 140px;
  width: 240px;
  text-align: center;
  line-height: 140px;
  font-size: 20px;
  position: absolute;
  top: 350px;
  left: calc(50% - 120px);
  z-index: 2;
}
#sign-can .guaCanvas {
  z-index: 3;
  position: absolute;
  top: 350px;
  left: calc(50% - 120px);
}

.canvas-box {
  margin: auto;
  background: url('../../../static/bcg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
  width: 263px;
  height: 180px;
  padding: 10px;
  position: absolute;
  top: 335px;
  left: 56px;
  left: calc(50% - 131.5px);
  z-index: 1
}
.button-start {
  margin: auto;
  padding-top: 50px;
  text-align: center;
  width: 263px;
  height: 180px;
  position: absolute;
  top: 335px;
  left: calc(50% - 131.5px);
  z-index: 4
}
.chat-pri {
  position: fixed;
  bottom: 20px;
  left: calc(50% - 50px)
}
.sign-body {
  
  .dialog-content {
    text-align: center;
    .dialog-img {
      width: 90%;
      margin-left: 0.5rem;
    }
  }
}
.tel {
  .el-dialog, .el-pager li {
    background: #fff!important
  }
}
</style>
<style>
.tel>.el-dialog, .el-pager li {
  background: #fff!important  
}
.el-dialog, .el-pager li {
    background: none!important
  }
.start-use {
  background: #e6cf02;
  border: none;
  width: 70%;
  position: relative;
  top: -20px;
  left: -20px;
}
.el-dialog__headerbtn {
  color: #e6cf02;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #e6cf02;
  border: 1px solid #e6cf02;
  border-radius: 50%
}
</style>




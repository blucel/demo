<script setup lang="ts">
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus';
import { useRouter } from 'vue-router';
import { useChangePwdLogic } from '../login/useChangeInitPwd';
import { useUserStore } from '@/store/modules/users'



const userStore = useUserStore()
const router = useRouter();
const userHeadImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAACTFBMVEUAAADJ5f/C1f/Y6//D1f/D1P/D1f/C1f/C1f/D1f/D1f/C1P/D1v/D1P/F1f/E1f/D4f8qkf/8/f7C1f/D1P/C1f/D1f/G2f8Pl/82of8Alv8Alv8qkf8Alv8Amf+z1P8qkP8rkP8rkf8qkP8rkP8rkv8fk/8rk/8tlv99vP8qkf8hkf+my/+XyP8Alf8rkP8ulP/C1P/+48oqkP8Alf8yLSj///8mKjMakf99vP+02P/Z2uv24dL74MfqzrYhJS0ICAoDlP8lkf/9483228IsMTv1+f/L2/9Nrf8Hlf8gkf8dkf/H1vv+7dzt39ry39X94skeISkkIR8UFhsVFBPN5f+dxv90vv88rv9XrP9Upv8VnP8el/8Pk/8nkf8opf7a6f3p8/mEyfjQ1/O3yPHd3euru+Lm3eCouN3+5s+Ypsjz2L/x1r7v07uFkrDArqBveZOtmolocYlSWWx2aV4wNUFRSEBDPDclKTIwKycrJyMZHCIcGhgNDhDl8f/o7v/R3v+h2P+60f+k0f+oyv+kyv+Iwf9uuf9Fsf9fq/9Dqv82p/8fof9Dnf8rl/8ulf8Sk/8Nmv4JmP5jvf0bn/3K5vj++/fL1ve7zff8+PXx9PX09PPQ5fLJ3/DU5O7i3OT37OLn29j+6dWdrM/03cnv18KQnb7t0bqLmLfky7bgyLK5srLWv6p9iaV7hqLKtKB4hJ94g567qpuyn41kbYSjkYFcZXpobHlZYnaQgXKHeWtsY1xZV1xFS1tVUlRbUktCQ0cpLTcpKi0hHhxL2Mh0AAAAMXRSTlMACeYD+fXy7Nu3r498ZmBOEfX898tcNxsbCffmX1w3/Obbt6+PfGZOEezs5svLy8s3l8xbiQAAAwdJREFUSMeFlPVf20AYh68tpd7SUkpxl/mShnSMlRba4u4wXDdsMHTI3N3d3d1d/rElJM3lkvTD81Ny3/fJe/fJ3QERMpNOo1aFhKjUGp1JBpYhzKhVYjyUWmMYCI5MH4qJCNUHa6MwyGFZ7+DDwcvss9ygABJEWmH5ls9OCv/HfvbdGglE2Hiff/HHyeB/HWhiAwIiwmH9GFU6Wz3vppX37Fh4hKAezubHlNP9d2aupmahprZ61vkyECCGDX5/wjm/+C+LYa7OU+vvDfSw8dbLm7+/1vMri6PO4x4NJHJu5QorBnF7Fp6+mg4IOxart3ORVcEKBgwRZnDc92E6YLihgBnY/yvnC1N14zjN8/Evk5Nf3z1xvoGZnPnneozPxDcc4fdjXqhf2m/o/hl7iwo/+/n7it6JRgxhdBsqfEdSIyVoUeGeQPiEpFpqyUpkpKfyASo8u4ScDxkwoQ0GcCGVSG4COlS4tYygAxpUKPMKhT4k1wA1htJTgdZXoLEaqDAhfMNbJghVIEQk5PCEAWEYAgUIrK8qEwsqsXCfE+6IMhVcNGTTcBVO4xrOEWVqoJEQXLkjQ76hkVyXWNAAnYSAu3IpHrlwsaADJikBr/L5XDguIZjg5kMEBrGglHHbG7IbCn2FgkwrPkCFBeSVrWx9uYXchaZG8RHtJEnyImOUkxRIj9Aw4SWwvyWbKuq6Stff7bKQpKWlgRfr0Wumofmkw3GEJDvPdt+mhGsdTQXkTofjVPMB7pqBF1lC9tHWfAfFCbL+DEFc8OLl3QTRVFBPj+W3Fh3cCy8yoFhTtJkgShwM+6hn4vhN73WC4nAjO5pXfOzQagVgscdQWTGTtBcTNOdunCeWKGEFgoixA474aCpqW0raCIYOgoURSvKi4wGPODoqpae7gaFxTxHzQA/SlMYBhDiqR167g2Mjme3gY44FAuKpdZwOKiSuByLsawkiP4iwzg4kUKSvku6QmK4A0kSlmcWCOS0KBCczNsXMF8wpsZlgGaIyUpOTViZYViQlp2aIP/4fJ+COaSqOTnUAAAAASUVORK5CYII='




const {
  changePwdFormRef,
  changePwdFormData,
  changePwdFormColumns,
  changePwdRules,
  changePwdFormHandleEvent,
  handleConfirm
} = useChangePwdLogic(0)



const handleCommand = (item) => {
  if(item === 'changePwd'){
    changePwd()
  }
  if(item === 'logout'){
    logout()
  }
}

const changePwd = ()=> {
  openChangePwdDg()
}

const logout = () => {
  userStore.logoutAction(router)
}

const isShow = computed({
  get:() => userStore.changePwdDialogVisible,
  set:(v) => userStore.setChangePwdDialogVisible(v)
})

const changePwdDgProps = reactive({
  title: '修改密码',
  showDrawer: isShow,
  size: 'small'
})

const openChangePwdDg = () => {
  changePwdDgProps.showDrawer = true
}

const handleDialogCancel = () => {
  changePwdFormRef.value.resetForm(changePwdFormRef.value.ruleFormRef)
  changePwdDgProps.showDrawer = false
}


// 新增编辑抽屉
const handleDrawerEvent = (data) => {
  const { eventName = '' } = data
  // 抽屉点击确定按钮
  if(eventName === 'success'){
    unref(handleConfirm)();
  }
}

// 关闭抽屉前的设置（会暂停抽屉的关闭）重置表单
const handleCloseDrawer = async (done) => {
  if (changePwdFormRef.value) {
    await changePwdFormRef.value.resetForm(changePwdFormRef.value.ruleFormRef)
  }
  done()
}
</script>

<template>

  <div class="custom-header-right">
    <el-dropdown trigger="click" @command="handleCommand">
      <div class="user-item">
        <img :src="userHeadImg" alt="" class="user-avatar">
        <span class="user-name">{{ userStore.getCurrentUserName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="header-drop-menu user-drop-menu">
          <el-dropdown-item command="changePwd"><span class="iconfont icon-xiugaimima"></span>修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">
             <span class="iconfont icon-tuichudenglu"></span>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <ya-drawer :drawerProps="changePwdDgProps" @handleEvent="handleDrawerEvent"  destroy-on-close :before-close="handleCloseDrawer">
      <template #content>
        <YaForm label-position="top" ref="changePwdFormRef" labelWidth="100px" :formColumns="changePwdFormColumns"
          :formData="changePwdFormData" :rules="changePwdRules" @handleEvent="changePwdFormHandleEvent">
        </YaForm>
      </template>
    </ya-drawer>
  </div>

</template>

<style lang="scss" scoped>
.custom-header-right {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  padding-right: 16px;
  box-sizing: border-box;

  .user-item {
    display: flex;
    align-items: center;
    cursor: pointer;

    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      box-sizing: border-box;
    }

    .user-name {
      font-size: 14px;
      font-weight: 400;
      color: #FFFFFF;
      margin-left: 8px;
    }
  }
}

.header-drop-menu{
  .el-dropdown-menu__item{
    .iconfont{
      font-size: 14px;
      margin-right: 5px;
    }
  }
}
</style>

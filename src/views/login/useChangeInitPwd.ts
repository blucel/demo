
import { FormRules } from 'element-plus'
import { ref, reactive, toRefs } from 'vue'
import { addQueryToUrl } from '../../utils/https/utils'
import { http } from '../../utils/https'
import { useUserStore } from '../../store/modules/users'
import { yaMessage } from '../../utils/message'
import { pwdRegular } from '../../utils/valid'
import { useRouter } from 'vue-router'

const changePwdApi = '/user/updatePsw'

/**
 * @description: 修改密码的 hook
 * @description: 强制修改密码页面 | 全局修改密码弹窗 公用
 * @return {*}
 * @author: changjun
 */
export const useChangePwdLogic = () => {
  const changePwdFormRef = ref()
  const userStore = useUserStore()
  const router = useRouter()
  const changePwdFormData = reactive({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  
  const changePwdFormColumns = reactive([
    {
      key: 'oldPassword',
      type: 'password',
      label: '原密码',
      clearable: true,
      showPassword: true,
      placeholder: '密码长度为8～16位，包含数字、大、小写',
      validateEvent: false,
    },
    {
      key: 'newPassword',
      type: 'password',
      label: '新密码',
      clearable: true,
      showPassword: true,
      placeholder: '密码长度为8～16位，包含数字、大、小写',
      validateEvent: false,
    },
    {
      key: 'confirmNewPassword',
      type: 'password',
      label: '确认新密码',
      clearable: true,
      showPassword: true,
      placeholder: '密码长度为8～16位，包含数字、大、小写',
      validateEvent: false,
    },
  ])
  
  
  
  const validatePassword = (rule, value, callback) => {
    if (value !== changePwdFormData.newPassword) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }
  
  const changePwdRules = reactive<FormRules>({
    oldPassword: [
      {
        required: true,
        message: '原密码为必填项',
      },
      {
        min: 8,
        max: 16,
        message: '密码长度在8到16个字符',
      },
      {
        pattern: pwdRegular,
        message: '要具备大写字母、小写字母、数字、特殊字符相结合',
      }
    ],
    newPassword: [
      {
        required: true,
        message: '新密码为必填项',
      },
      {
        min: 8,
        max: 16,
        message: '密码长度在8到16个字符',
      },
      {
        pattern: pwdRegular,
        message: '要具备大写字母、小写字母、数字、特殊字符相结合',
      }
    ],
    confirmNewPassword: [
      {
        required: true,
        message: '确认新密码为必填项',
      },
      {
        min: 8,
        max: 16,
        message: '密码长度在8到16个字符',
      },
      {
        pattern: pwdRegular,
        message: '要具备大写字母、小写字母、数字、特殊字符相结合，至少3种',
      },
      {
        validator: validatePassword,
      },
    ]
  })



  const changePwdFormHandleEvent = (data) => {
    const { eventName } = data || {}
    if(eventName === 'successSubmit') {
      submitForm(data.data)
    }
    if(eventName === 'errorSubmit'){
      errorFormCallBack(data.data)
    }
  }
  
  
  
  // 确定
  const handleConfirm = async () => {
    await changePwdFormRef.value.submitForm(changePwdFormRef.value.ruleFormRef)
  }
  
  const submitForm = (data) => {
    console.log('submitForm', data)
    changePwdRequest()
  }
  
  const errorFormCallBack = (data) => {
    console.log('errorFormCallBack', data)
  }

  /**
   * @description: 修改密码的请求
   * @return {*}
   * @author: changjun
   */  
  const changePwdRequest = async () => {
    const params = {
      id: userStore.getCurrentUserId,
      oriPassWd: changePwdFormData.oldPassword,
      pwd: changePwdFormData.newPassword,
    }
    const _url = addQueryToUrl(params, changePwdApi)
    const res = await http.post(_url) as any
    if(res.code === 1){
      yaMessage('密码修改成功。为了您的安全，请重新登录', 'success', true)
      userStore.logoutAction(router)
    }else{
      yaMessage(res.data, 'error', true)
    }
  }

  const toLogin = () => {
    userStore.logoutAction(router)
  }


  return toRefs({
    changePwdFormRef,
    changePwdFormData,
    changePwdFormColumns,
    changePwdRules,
    changePwdFormHandleEvent,
    handleConfirm,
    toLogin
  })
}

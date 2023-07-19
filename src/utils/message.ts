import { ElMessage, ElMessageBox } from 'element-plus'

export const yaMessage = (message: string, type: 'success' | 'warning' | 'info' | 'error' = 'success', showClose = false) => {
  ElMessage({
    message,
    type,
    offset: 24,
    appendTo: document.body,
    showClose,
    customClass: 'ya-message',
  })
}


export const yaErrorMessage = (message: string, showClose = false) => {
  yaMessage(message, 'error', showClose)
}

/**
 * @description: 二次确认弹窗，主要用于删除前的二次确认场景
 * @param {*} content
 * @param {*} title
 * @return {*}
 * @author: changjun
 */
export async function yaConfirmMessage(content, title = '确认删除') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: 'ya-confirm-error-messagebox',
    confirmButtonClass: 'ya-button',
    cancelButtonClass: 'ya-button',
    type: 'error'
  })
}

/**
 * @description: 二次确认弹窗，主要用于警告的二次确认场景
 * @param {*} content
 * @param {*} title
 * @return {*}
 * @author: changjun
 */
 export async function yaConfirmWarningMessage(content, title = '提示') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: 'ya-confirm-error-messagebox',
    confirmButtonClass: 'ya-button',
    cancelButtonClass: 'ya-button',
    type: 'warning'
  })
}

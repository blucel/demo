import { ElNotification } from 'element-plus'


export const yaNotification = (title, type, hasClose, dangerouslyUseHTMLString = false, message) => {
  return ElNotification({
    title,
    type,
    duration: hasClose? 4500: 0, 
    offset: 20,
    appendTo: document.body,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString,
    message,
    customClass: 'ya-notify'
  })
}

export const changePasswordNotification = (fn) => {
  const _html = `<div class="ya-change-pwd-notify-content">
                  <div class="top">
                    <div>您的密码30天内未修改。为了您的安全，建议您</div>
                    <div class="change-pwd-text">修改密码</div>
                  </div>
                  <div class="bottom">
                    <button class="el-button el-button--primary ya-button confirm-btn" aria-disabled type="button" title="我知道了"><span>我知道了</span></button>
                  </div>
                </div>`
  
  const message = _html
  const notify = yaNotification('密码修改提示', 'warning', false, true, message)
  const notifyDom = document.querySelector('.ya-notify')
  notifyDom?.querySelector('.change-pwd-text')!.addEventListener('click', (event) => {
    event.stopPropagation()
    fn(notify)
  })

  notifyDom?.querySelector('.confirm-btn')!.addEventListener('click', () => {
    notify.close()
  })

  console.log(notify, 'notify');
}

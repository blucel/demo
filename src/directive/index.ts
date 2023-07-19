
export default {
  //自定义节流操作
  preventReClick:{
      mounted(el:any,binding:any){
          el.addEventListener('click',()=>{
              if(!el.disabled){
                  el.disabled = true
                  setTimeout(()=>{
                      el.disabled = false
                  },binding.value||200) //200ms间隔时间
              }
          })
      }
  }
}

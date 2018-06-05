function loginCheck () {
  let name = wx.getStorageSync('name')
  if (name !== '') return true
  else {
    wx.showToast({
      title: '请返回登录', // 提示的内容,
      icon: 'none', // 图标,
      duration: 2000, // 延迟时间,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      success: res => {}
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
      })
    }, 2000)
    return false
  }
}

export default loginCheck

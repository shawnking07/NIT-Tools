function getAccount () {
  var stuId = wx.getStorageSync('stuId')
  var password = wx.getStorageSync('password')
  var name = wx.getStorageSync('name')
  var account = new Array(3)
  account[0] = stuId
  account[1] = password
  account[2] = name
  return account
}

export default getAccount

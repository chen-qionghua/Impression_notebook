export function friendlyDate(datsStr) {
  let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
  let time = dateObj.getTime() //获取传入参数的时间戳
  let now = Date.now() //获取当前时间
  let space = now - time
  let str = ''


  switch (true) {
    case space < 60000:
      str = '刚刚'
      break
    case space < 1000 * 3600:
      str = Math.floor(space / 60000) + '分钟前'
      break
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
  }
  return str
}

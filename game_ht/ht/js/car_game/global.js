
function setBetName(a) {
  var b = ''
  switch (a) {
    case 0:
        b = '大保时捷'
        break;
    case 1:
        b = '大宝马'
        break;
    case 2:
        b = '大奥迪'
        break;
    case 3:
        b = '大大众'
        break;
    case 4:
        b = '小保时捷'
        break;
    case 5:
        b = '小宝马'
        break;
    case 6:
        b = '小奥迪'
        break;
    case 7:
        b = '小大众'
        break;
    default:
        b = ''
  }
  return b;
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate;
}
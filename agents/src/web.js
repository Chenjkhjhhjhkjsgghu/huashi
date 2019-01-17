import axios from 'axios'

var Web =  {
    "shijie":{"url":"https://api.fq98.com:8808","name":"视界","logo":"shijie.jpg"},
    "hjba":{"url":"https://api.fq98.com:8808","name":"欢聚吧","logo":"hjba.jpg"},
    "2019yl":{"url":"https://api.fq98.com:8808","name":"2019娱乐","logo":"2019yl.jpg"}
  }

  sessionStorage.Web = JSON.stringify(Web)


export default Web;





let express = require("express");
let axios = require("axios");

const { createProxyMiddleware } = require('http-proxy-middleware');
let url = "139.9.154.124:52023/sjcjbs2019/grid2/getXML?pName=grid-jkpz-erpscsjxx&args=%7B%22keyWord%22:%22undefined%22,%22PN_SCX%22:%22undefined%22,%22PC_SCSJ_Q%22:%222020-09-01%2000:00:00%22,%22PC_SCSJ_Z%22:%222020-09-01%2023:55:00%22%7D&dhxr1599751108139=1"

let app = express()
app.use('/', createProxyMiddleware({ target: url, changeOrigin: true }),function(req,res){
    
});

// app.get("/",function(res,req){
//     console.log("有人请求了")
    
//     axios({
//         mathod:"get",
//         url:url
//     }).then(function (rep) {
//         req.send(rep)
//       })




// })
app.listen(3000,function () {
   console.log("服务器启动成功")


  })

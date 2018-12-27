var express = require('express');
var router = express.Router();
var URL = require('url');
var User = require('../models/User');//引入模型
var User1 = require('./user');//引入模型

/* GET users listing. */
router.get('/getUserInfo', function (req, res, next) {

  var user = new User1();

  var params = URL.parse(req.url, true).query;

  switch (params.id) {
    case "1" :
      user.name = "啦啦啦";
      user.age = "10";
      user.city = "深圳市";
      break;
    case "2":
      user.name = "呼呼呼";
      user.age = "20";
      user.city = "广州市";
      break;
    case "3":
      user.name = "哗哗哗";
      user.age = "30";
      user.city = "珠海市";
      break;
    default:
      res.send("查无此人");
      break;
  }

  var response = {status: 200, data: user};
  res.send(JSON.stringify(response));
});


router.get('/submit', (req, res, next) => {
  // var user = new User({
  //   username: 'admin123',
  //   password: '123'
  // });
  // user.save((err) => { //添加
  //   console.log('save status:', err ? 'failed' : 'success');
  // });

  // res.send('chenggong')
  // User.find({ //查找
  //   username: 'admin',
  //   password: '123'
  // }, (err, docs) => {
  //   if (err) {
  //     res.send('server or db error');
  //   } else {
  //     console.log('登录成功用户：' + docs);
  //     if (docs.length == 0) {
  //       res.send('用户名或密码有误');
  //     } else {
  //       req.session.user = {
  //         _id: docs[0]._id,
  //         username: docs[0].username
  //       };
  //       res.send('login success');
  //     }
  //   }
  // });

  User.findOne({ //查找一条
    // username: req.query.username,
    password:'123'
  },(err, doc)=>{
    if(err){
      res.send('server or db error');
    }else{
      console.log('登录成功用户：'+doc);
      if(doc==null){
        console.log(req);
        res.send('用户名或密码有误');
      }else{
        let data = {
          _id: doc._id,
          username:doc.username
        };
        res.send({code: 200, data: data});
      }
    }
  })


  // User.find((err,doc)=>{
  //   if(err){
  //     res.send("err")
  //   }else{
  //     console.log(doc);
  //     res.send(doc)
  //   }
  // })

});


module.exports = router;

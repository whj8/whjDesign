import {Request, Response, NextFunction} from 'express'
import path from "path";
import fs from "fs";
import {Fields, Files, File} from "formidable";
const cookieParser = require('cookie-parser')


/**
 * 支持单个或多个文件上传！！！
 */
const formidable = require('formidable'); //当然还要引入下面这个包才能实现文件的上传
const express = require('express')
const app = express()
const cors = require('cors')
const whitelist = ['http://localhost:1333', 'http://localhost:1299/abc']
const corsOptions = {
  // 允许跨域请求 && 允许跨域带cookie
  credentials:true,
  origin: function (origin: string, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
  // 以上相当于在请求头中设置了
  // 如果前端ajax中设置了withCredentials（前端想跨域+带cookie访问），则，后端必须设置以下两个：
  // Access-Control-Allow-Origin -> http://localhost:1333
  // 'Access-Control-Allow-Credentials' -> 'true'
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())


app.use('/whj',cors(corsOptions))
app.post('/whj', (req: Request, res: Response, next: NextFunction) => {
  let form = new formidable.IncomingForm({
    multiples: true,
  });
  form.uploadDir = __dirname + '/upload'; //设置文件上传的存放地址（*** 必须先手动创建该文件夹 ***）//----------改 002
  //执行下面代码的时候，表单已经全部接收完毕了
  //所有的文本域/单选框，都在fields存放
  //所有的文件域，都在files中存放
  form.parse(req, function (err: any, fields: Fields, files: Files) {
    const fileData: File | File[] = files.myFile;
    // return
    if (err) throw err
    if(!Array.isArray(fileData)){
      saveFile(fileData)
      res.status(200).json({fields, files});
    }else{
      fileData.forEach((file: File)=>{
        saveFile(file)
      })
      res.status(200).json({fields, files});
    }
  });
})

function saveFile(file: File){
  const ttt = Date.now();
  const ran = parseInt((Math.random() * 89999 + 10000).toString()); //五位数的随机数
  const extname = path.extname(file.originalFilename!); //----------改 003 表单中的name
  const oldName = file.filepath;
  const newName = __dirname + "/upload/" + ttt + ran + extname; //----------改 004
  fs.renameSync(oldName, newName);
}
app.listen(1299, () => console.log(1299))
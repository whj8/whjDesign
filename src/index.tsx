import React from "react";
import ReactDOM from 'react-dom';
import Upload from './component/Upload'
import './01/index'
import Test from "./component/Test";
import "core-js/stable";
import "regenerator-runtime/runtime"


ReactDOM.render(
  <>
    <Upload
      drag={true}
      accept='.jpg,.pdf'
      name='myFile'
      action='http://localhost:1299/whj'
      multiple={true}
      withCredentials={true}
      // onProgress={(p,f)=>console.log("->",p)}
      onError={(err)=>console.log("ERR:",err)}
      // beforeUpload={(file => {
      //   if(file.size>15162){
      //     alert(file.name + " 文件太大了")
      //     return false
      //   }else{
      //     return true
      //   }
      // })}
      onRemove={(file)=>console.log(file)}
    />
    <Test/>
  </>
  ,
  document.getElementById('root')
);
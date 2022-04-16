import React, {ChangeEvent, useEffect} from "react";
import axios from 'axios'

const Upload = () => {
  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    //单个文件上传
    const files = e.target.files;
    if (files) {
      const formData = new FormData()
      formData.append('myFile', files[0])
      console.log(formData)
      axios.post('http://localhost:1299/whj', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(data => console.log(data.data))
    }
  }
  return (
    <div>
      {/* 一、表单形式 */}
      {/*  encType='multipart/form-data' 专门发送二进制文件  */}
      {/*<form method='post' action="http://localhost:1299/whj" encType='multipart/form-data'>*/}
      {/*  <input type="file" name='myFile'  multiple={true}/>*/}
      {/*  <button type='submit'>Submit</button>*/}
      {/*</form>*/}
      {/* 二、受控形式 */}
      <form>
        <input type="file" onChange={changeFile} multiple={true}/>
      </form>
    </div>
  )
}
export default Upload
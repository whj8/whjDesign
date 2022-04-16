import React, {ChangeEvent, useState, useRef} from "react";
import axios from 'axios'
import './style.css'
import * as stream from "stream";

export interface UploadProps {
  name: string;
  multiple?: boolean;
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  beforeUpload?: (file: File) => Promise<File> | boolean
}

const Upload = (props: UploadProps) => {
  const {action, onError, onProgress, onSuccess, multiple = false, name, beforeUpload} = props
  const [process, setProcess] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return
    }
    Array.from(files).forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result instanceof Promise) {
          result.then(file => post(file))
        } else if (result !== false) {
          post(file)
        }
      }
    })

    if (input.current) {
      input.current.value = ''
    }
  }

  const post = (file: File) => {
    const formData = new FormData()
    formData.append(name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // axios原生的上传进度使用
      onUploadProgress: (e) => {
        let present = Math.round((e.loaded * 100) / e.total) || 0;
        setProcess(present)
        onProgress && onProgress(present, file)
      }
    }).then(data => {
      onSuccess && onSuccess(data.data, file)
    }).catch(e => {
      onError && onError(e, file)
    })
  }

  const upload = () => {
    if (input.current) {
      input.current.click()
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
      <div onClick={upload}>上传文件</div>
      <div className='loading_box'>
        <div className='loading' style={{width: `${process}%`}}/>
      </div>
      {
        process === 100 ? '上传成功' : ""
      }
      <input className='input' ref={input} type="file" onChange={changeFile} multiple={multiple}/>
    </div>
  )
}
export default Upload
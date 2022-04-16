import {SetStateAction} from 'react'
import {UploadFile} from "@/component/Upload/type";
import axios from "axios";

export const post = (
  file: File,
  action: string,
  name: string,
  setFiles: (value: SetStateAction<UploadFile[]>) => void,
  updateFileList: (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => void,
  onProgress?: (percentage: number, file: UploadFile) => void,
  onSuccess?: (data: any, file: UploadFile) => void,
  onError?: (err: any, file: UploadFile) => void,
  headers?:{[key: string]: any},
  data?:{[key: string]: any},
  withCredentials?: boolean
) => {
  const _file: UploadFile = {
    uid: Date.now() + 'file',
    name: file.name,
    size: file.size,
    status: 'ready',
    present: 0,
    raw: file
  }
  setFiles((prev: UploadFile[]) => {
    return [_file, ...prev]
  })
  const formData = new FormData()
  if(data){
    Object.keys(data).forEach(key=>{
      formData.append(key, data[key])
    })
  }
  formData.append(name, file)
  axios.post(action, formData, {
    ...headers,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials,
    // axios原生的上传进度使用
    onUploadProgress: (e) => {
      let present = Math.round((e.loaded * 100) / e.total) || 0;
      if (present < 100) {
        updateFileList(_file, {present, status: 'uploading'})
      }
      onProgress && onProgress(present, _file)
    }
  }).then(data => {
    onSuccess && onSuccess(data.data, _file)
    updateFileList(_file, {present: 100, status: 'success'})
  }).catch(e => {
    updateFileList(_file, {status: 'error'})
    onError && onError(e, _file)
  })
}
import React, {useRef} from "react";
import {UploadFile, UploadProps} from '@/component/Upload/type'
import {useUpdateFileList} from '@/component/Upload/hooks'
import {uploadFiles} from './handler'
import Drager from "@/component/Upload/drager";
import './style.css'

const Upload: React.FC<UploadProps> = (props) => {
  const {
    drag,
    action,
    onError,
    onProgress,
    onSuccess,
    multiple = false,
    name,
    beforeUpload,
    onRemove,
    headers,
    data,
    withCredentials,
    accept
  } = props;
  const load = (files: FileList)=>uploadFiles(
    files,
    input,
    action,
    name,
    setFiles,
    updateFileList,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    headers,
    data,
    withCredentials
  )
  const input = useRef<HTMLInputElement>(null)
  const {files, setFiles, updateFileList, removeFile} = useUpdateFileList()
  const upload = () => {
    if (input.current) {
      input.current.click()
    }
  }
  const remove = (file: UploadFile) => {
    removeFile(file)
    if (onRemove) {
      onRemove(file)
    }
  }
  return (
    <div>
      {
        drag ?
          <Drager onFile={(files) => load(files)}/>
          : <div onClick={upload}>上传文件</div>
      }
      {
        files.map((item: UploadFile, index: number) => (
          <div key={index}>
            <div className='loading_box'>
              <div
                className='loading'
                style={{width: `${item.present}%`, backgroundColor: item.present < 100 ? "red" : 'green'}}
              />
            </div>
            <div>{item.name}</div>
            <div onClick={() => remove(item)}>删除</div>
          </div>
        ))
      }
      <input
        className='input'
        type="file"
        multiple={multiple}
        ref={input}
        accept={accept ?? "*"}
        onChange={(e) =>load(e.target.files!)}
      />

    </div>
  )
}
export default Upload
import {RefObject, SetStateAction} from "react";
import {post} from './post'
import {UploadFile} from "@/component/Upload/type";


/**
 * file控件onChange事件
 * @param e fileDOM
 * @param beforeUpload
 * @param input
 */
export const uploadFiles = (
  files: FileList,
  input: RefObject<HTMLInputElement>,
  action: string,
  name: string,
  setFiles: (value: SetStateAction<UploadFile[]>) => void,
  updateFileList: (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => void,
  onProgress?: (percentage: number, file: UploadFile) => void,
  onSuccess?: (data: any, file: UploadFile) => void,
  onError?: (err: any, file: UploadFile) => void,
  beforeUpload?: (file: File) => Promise<File> | boolean,
  headers?:{[key: string]:any},
  data?:{[key: string]:any},
  withCredentials?:boolean
  ) => {

  if (!files) {
    return
  }
  Array.from(files).forEach((file) => {
    const postFile = (f: File) => post(f, action, name, setFiles, updateFileList, onProgress, onSuccess, onError, headers, data, withCredentials)
    if (!beforeUpload) {
      postFile(file)
    } else {
      const result = beforeUpload(file)
      if (result instanceof Promise) {
        result.then(file => postFile(file))
      } else if (result !== false) {
        postFile(file)
      }
    }
  })
  if (input.current) {
    input.current.value = ''
  }
}
import {useState} from "react";
import {UploadFile} from "@/component/Upload/type";

export const useUpdateFileList = () => {
  const [files, setFiles] = useState<UploadFile[]>([])
  const updateFileList = (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => {
    setFiles((prev) => {
      return prev.map(file => {
        if (file.uid === uploadFile.uid) {
          return {...file, ...uploadObj}
        }
        return file
      })
    })
  }
  const removeFile = (uploadFile: UploadFile) => {
    setFiles((prev) => {
      return files.filter(item => item.uid !== uploadFile.uid)
    })
  }
  return {files, setFiles, updateFileList, removeFile}
}
/**
 * 上传组件props
 */
export interface UploadProps {
  name: string;
  multiple?: boolean;
  action: string;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void
  onError?: (err: any, file: UploadFile) => void
  beforeUpload?: (file: File) => Promise<File> | boolean
  onRemove?:(file: UploadFile)=>void
  headers?:{[key: string]: any}
  data?:{[key: string]: any}
  withCredentials?:boolean,
  accept?: string
  drag?: boolean
}

/**
 * 文件状态值
 */
export type UploadFileStatus = 'ready' | 'error' | 'success' | 'uploading'

/**
 * 当前文件状态
 */
export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status?: UploadFileStatus;
  present: number;
  raw?: File;
  response?: any;
  error?: any
}


export interface DragerProps{
  onFile: (file: FileList)=>void
}
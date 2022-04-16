import React, {DragEvent, useState} from "react";
import {DragerProps} from './type'
import './drager.css'

const Drager: React.FC<DragerProps> = (props) => {
  const {onFile} = props
  const [dragOver, setDragOver] = useState(false)
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className='drager'
      style={{border: dragOver ? 'solid 4px #f00' : 'none', padding: dragOver ? 0 : 4}}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      拖拽文件至此上传
    </div>
  )
}
export default Drager
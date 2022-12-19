import uploadImage from '../assets/image.svg';
import { useState, useRef, useContext } from 'react';
import api from '../api/imageApi'
import UploadContext from '../context/UploadContext';


const DragDropFile = () => {
  const{ dragActive, setDragActive, inputRef, handleDrag, handleChange, handleUpload, handleDrop } = useContext(UploadContext)

  return (

    <section className="drag-drop-section">
      <div className="dragDrop--container">
        <p className="upload--heading">Upload your image</p>
        <p className="upload--file-text">File should be Jpeg, Png,...</p>

        <form className='upload--field'
          onSubmit={(e) => e.preventDefault()}
          onDragEnter={handleDrag}>
          <input 
            type="file"
            accept='image/*' 
            className='upload--input' 
            ref={inputRef}
            onChange={handleChange}
            id='upload-image'/>
          <label 
            htmlFor="upload-image" 
            className={dragActive ? "upload--label upload--label-active" : "upload--label"}>
            <img 
              src={uploadImage} 
              alt="upload image" />

            <p className='label--text'>Drag & Drop your image here</p>
            { dragActive && <div className='drag-file-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
          </label>
          
        </form>
        <form 
          onSubmit={(e) => e.preventDefault()}
          onChange={handleChange}>
          <p className='or--text'>Or</p>
            <input type="file" accept='image/*' id='image-input'/>
            <label htmlFor="image-input" className='image--upload'>Choose a file</label>
        </form>
      </div>
    </section>
  )
}


export default DragDropFile
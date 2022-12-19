import { useContext } from "react"
import UploadContext from "../context/UploadContext";


const UploadSuccess = () => {
  const { uploadedImage } = useContext(UploadContext);
  
  return (
    <section className="success--container">
      <span className="material-symbols-outlined success--icon">check_circle</span>
      <p className="success--text">Uploaded Successfully!</p>
      <img src={uploadedImage[0].path} alt="" className="success--image"/> 
      <div className="success--copy__container">
        <p className="success--copy__text">{uploadedImage[0].path}</p>
        <button 
          className="success--copy__button"
          onClick={() => navigator.clipboard.writeText(uploadedImage[0].path)}>Copy Link</button>
      </div>
    </section>
  )
}

export default UploadSuccess
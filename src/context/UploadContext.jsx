import { createContext, useState, useRef, useEffect } from "react";
import api from '../api/imageApi';

const UploadContext = createContext({});

export const UploadProvider = ({ children }) => {

  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedImage, setUploadImage] = useState([{
    "_id": {},
    "filename":"",
    "desc":"uploads",
    "path":"",
    "__v":{}
  }])
  const inputRef = useRef(null);

  useEffect(() => {
    const getAllImage = async () => {
      const response = await api.get('/upload');
      setUploadImage(response.data);
      console.log(uploadedImage[0].path)
    }
    getAllImage();
  }, [isLoading])

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      console.log(e.type)
    } else if (e.type === "dragleave") {
      console.log(e.type)
      setDragActive(false);
    }
  };


  const handleChange = async (e) => {
    e.preventDefault();
    console.log(e.target.files)
    if (e.target.files) {
      handleUpload(e.target.files)
    }
  }

  const handleUpload = async (files) => {
    if (files) {
      const images = files
      const formData = new FormData();
      formData.append('images', files[0])
      setIsLoading(true)
      try {
        const response = await api.post('/upload', formData);
        setIsLoading(false)
        setUploadSuccess(true)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      handleUpload(e.dataTransfer.files)
    }
  }
  return (
    <UploadContext.Provider value={{
      dragActive, setDragActive, inputRef, handleDrag, handleChange,  handleUpload, handleDrop,
      isLoading, setIsLoading, uploadSuccess, setUploadSuccess,
      uploadedImage, setUploadImage
    }}>
    { children }
    </UploadContext.Provider>
  )
}

export default UploadContext
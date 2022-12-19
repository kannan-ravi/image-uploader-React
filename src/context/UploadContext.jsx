import { createContext, useState, useRef, useEffect } from "react";
import api from '../api/imageApi';

const UploadContext = createContext({});

export const UploadProvider = ({ children }) => {

  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [bigImage, setBigImage] = useState(false);
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
    }
    getAllImage();
  }, [isLoading])

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };


  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0].size <= 5e+6) {
      handleUpload(e.target.files)
    } else {
      setBigImage(true)
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
      dragActive, inputRef, handleDrag, handleChange, handleDrop, bigImage,
      isLoading, uploadSuccess,
      uploadedImage
    }}>
    { children }
    </UploadContext.Provider>
  )
}

export default UploadContext
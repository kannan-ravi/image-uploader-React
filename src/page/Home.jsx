import { useContext } from 'react';
import DragDropFile from '../components/DragDropFile';
import Loading from '../components/Loading';
import UploadSuccess from '../components/UploadSuccess';
import UploadContext from '../context/UploadContext';

const Home = () => {
  const { isLoading, setIsLoading, uploadSuccess, setUploadSuccess } = useContext(UploadContext);

  return (
      <main>
        {
          isLoading ? <Loading />
            : uploadSuccess ? <UploadSuccess />
            : <DragDropFile />
        }
        
      </main>
  )
}

export default Home
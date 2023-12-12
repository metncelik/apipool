import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react';
import Loading from "../components/Loading";
import "./Test.css";
import { setUser } from '../database/db';
import UploadImage from '../components/UploadImage';


const Test = () => {
  const [downloadUrl, setDownloadUrl] = useState()
  // const [user, setUser] = useState()
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const auth = getAuth()
  //   setUser(auth.currentUser)
  //   const timeoutId = setTimeout(() => {
  //     setIsLoading(false)
  //     console.log("Delayed log after timeout");
  //   }, 1000);

  //   return () => clearTimeout(timeoutId);
  // })

  useEffect(()=> {
    alert(downloadUrl)
  })
  
  return (
    <div>
      <UploadImage setDownloadUrl={setDownloadUrl}/>
      {downloadUrl&&
        <div>
          {downloadUrl}
        </div>
      }
      {/* {isLoading ?
        (<div>
          <Loading />
        </div>) :
        (<div>
          <button>
            Add
          </button>
        </div>)
      } */}
    </div>
  );
}

export default Test;
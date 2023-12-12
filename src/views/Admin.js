import '../styles/screens/Console.css'
import { useEffect, useState } from "react";
import AddModel from '../components/admin/AddModel';
import { MdOutlineAddBox } from "react-icons/md";
import { getUser } from '../database/db';
import { auth } from '../database/firebaseConfig';
import Loading from '../components/Loading';
import { onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const [activePanel, setActivePanel] = useState("AddModel")
  const [userData, setUserData] = useState(null)
  const [isPending, setIsPending] = useState(true)

  const renderActiveComponent = () => {
    switch (activePanel) {
      case 'AddModel':
        return <AddModel user={userData} />;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid
        getUser(userId).then((res) => {
          setUserData(res)
          setIsPending(false)
        })
      }
    });
  }, [])

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul className="menu">
          <li className={`menu-element ${activePanel === "AddModel" ? "active-panel" : ""}`} onClick={() => setActivePanel("AddModel")}>
            <MdOutlineAddBox />
            <div className="menu-label">
              AddModel
            </div>
          </li>
        </ul>
      </div>
      {isPending ?
        <Loading /> :
        renderActiveComponent()}
    </div>
  );
}

export default Admin;
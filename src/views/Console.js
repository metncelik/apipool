import '../styles/screens/Console.css'
import { useEffect, useState } from "react";
import Overview from '../components/console/Overview';
import Billing from '../components/console/Billing';
import Settings from '../components/console/Settings';
import { RxDashboard } from "react-icons/rx";
import { LuSettings } from "react-icons/lu";
import { BsCreditCard } from "react-icons/bs";
import { getUser } from '../database/db';
import { auth } from '../database/firebaseConfig';
import Loading from '../components/Loading';
import { onAuthStateChanged } from 'firebase/auth';

const Console = () => {
  const [activePanel, setActivePanel] = useState("Overview")
  const [userData, setUserData] = useState(null)
  const [isPending, setIsPending] = useState(true)

  const renderActiveComponent = () => {
    switch (activePanel) {
      case 'Overview':
        return <Overview user={userData} />;
      case 'Billing':
        return <Billing balance={userData.balance} userId={userData.user_id} bills={userData.bills} />;
      case 'Settings':
        return <Settings email={userData.email} />;
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
          <li className={`menu-element ${activePanel === "Overview" ? "active-panel" : ""}`} onClick={() => setActivePanel("Overview")}>
            <RxDashboard />
            <div className="menu-label">
              Overview
            </div>
          </li>
          <li className={`menu-element ${activePanel === "Billing" ? "active-panel" : ""}`} onClick={() => setActivePanel("Billing")}>
            <BsCreditCard />
            <div className="menu-label">
              Billing
            </div>
          </li>
          <li className={`menu-element ${activePanel === "Settings" ? "active-panel" : ""}`} onClick={() => setActivePanel("Settings")}>
            <LuSettings />
            <div className="menu-label">
              Settings
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

export default Console;
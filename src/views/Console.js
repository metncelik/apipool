import '../styles/views/Console.css';
import { useEffect, useState } from "react";
import Insights from '../tabs/console/Insights';
// import Billing from '../tabs/console/Billing';
import Settings from '../tabs/console/Settings';
import { LuSettings } from "react-icons/lu";
// import { BsCreditCard } from "react-icons/bs";
import { IoKeyOutline, IoStatsChart } from "react-icons/io5";
import useAuth from '../hooks/useAuthState';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useConsoleState from '../hooks/useConsoleState';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import ApiKeys from '../tabs/console/ApiKeys';
import { BsFilesAlt } from 'react-icons/bs';
// import MyEndpoints from '../tabs/console/MyEndpoints';
// import { CgAddR } from 'react-icons/cg';
// import AddEndpoint from '../tabs/console/AddEndpoint';


const Console = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [consoleState, setConsoleState] = useConsoleState();
  const [isPending, setIsPending] = useState(true);
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    const getMe = async () => {
      setIsPending(true);
      const response = await axiosPrivate.get("/user/me");
      setIsPending(false);
      if (!response) return;
      setConsoleState({ consoleState, user: response.data.user });
    };
    const activeTab = searchParams.get("tab");
    if (!activeTab) {
      setSearchParams({ "tab": 0 });
    };
    if (!auth.isLoggedIn) {
      navigate("/login", { state: { from: location }, replace: true });
    };
    getMe();
  }, []);

  const tabs = [
    {
      name: "API Keys",
      component: <ApiKeys />,
      icon: <IoKeyOutline />,
      active: true
    },
    {
      name: "Insights",
      component: <Insights />,
      icon: <IoStatsChart />,
      active: true
    },
    {
      name: "My Endpoints",
      component: null,
      icon: <BsFilesAlt />,
      active: false
    },
    // {
    //   name: "Add Endpoint",
    //   component: <AddEndpoint />,
    //   icon: <CgAddR />
    // },
    // {
    //   name: "Billing",
    //   component: <Billing />,
    //   icon: <BsCreditCard />
    // },
    {
      name: "Settings",
      component: <Settings />,
      icon: <LuSettings />,
      active: true
    }
  ];

  const renderActiveComponent = () => {
    const tabIndex = (searchParams.get("tab"));
    const activeTab = tabs[tabIndex] || tabs[0];
    return activeTab.component;
  };

  if (isPending) {
    return <Loading />
  }

  return (
    <>
      <div className="console">
        <div className="sidebar">
          <ul className="menu">
            {tabs.map((tab, index) => {
              return (
                <>
                  {!tab.active ? <li
                    className='menu-element disabled-tab'
                  >
                    {tab.icon}
                    <div className="menu-label">
                      {tab.name}
                    </div>
                    <div className='coming-label'>
                      COMING
                    </div>
                  </li> : <li
                    className={`menu-element ${searchParams.get("tab") === index.toString() && "active-tab"}`}
                    onClick={() => setSearchParams({ "tab": index })}
                  >
                    {tab.icon}
                    <div className="menu-label">
                      {tab.name}
                    </div>
                  </li>}
                </>
              );
            })}
          </ul>
        </div>

        <div className="tab-view">
          <div className="tab-view-header">
            <div className="info">
              <p>E-mail:</p>
              <div className="value">
                {consoleState.user?.email}
              </div>
            </div>
            <div className="info">
              <p>Balance:</p>
              <div className="value">
                {parseFloat(consoleState.user?.balance).toFixed(2)}$
              </div>
            </div>
          </div>

          {
            renderActiveComponent()
          }
        </div>
      </div>
    </>
  );
}

export default Console;
import '../../styles/components/dashboard/Settings.css'
import { BiLogOut } from 'react-icons/bi'
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../../components/Auth";

const Settings = ({email}) => {
    const navigator = useNavigate()
    const auth = getAuth()
    return (
        <div className="settings container">
            <div className="info">
                <p>E-mail:</p>
                <div className="value">
                    {email}
                </div>
            </div>
            <ChangePassword/>
            <div className='logout'>
            <button className='logout-button' onClick={() => {auth.signOut(); navigator("/login")}}>
                <BiLogOut size={15} className='logout' />
                <div className="logout-label">
                    Logout
                </div>
            </button>
            </div>

        </div>
    );
}

export default Settings;
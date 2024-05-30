import useConsoleState from '../../hooks/useConsoleState';
import '../../styles/tabs/console/Billing.css'
import { BsCreditCard } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";



const Billing = () => {
    const [consoleState, setConsoleState] = useConsoleState();
    return (
        <div className="billing container full" id='billing'>
            <form className="add-credit">
                <h2>Add Funds</h2>
                <div className="amount">
                    <div className="amount-input-container">
                        <FaDollarSign className='dollar-sign' size={20} />
                        <input className='amount-input' type='number' placeholder='10.00' />
                    </div>
                    <button type='submit' >
                        <BsCreditCard />
                        <div className="pay-button-label">
                            Pay
                        </div>
                    </button>
                </div>
                <div className="pay-container">
                </div>
            </form>
            <div className="billing-history">
                <h2>
                    Billing History
                </h2>
                <div className="table-container">

                    <table className='console-table billing-table'>
                        <tr>
                            <th>Date</th>
                            <th>Amount ($)</th>
                            <th>Status</th>
                        </tr>
                        {
                            // bills.map((bill, index) => {
                            //     return(
                            //     <tr key={index}>
                            //         <td>{bill.date}</td>
                            //         <td className='centered-text'>{"bill.amount"}</td>
                            //         <td className='centered-text'>{"bill.status"}</td>
                            //     </tr>
                            //     )
                            // })
                        }
                    </table>

                </div>
            </div>
        </div>
    );
}

export default Billing;
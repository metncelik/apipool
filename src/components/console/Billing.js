import { useState } from 'react';
import '../../styles/components/dashboard/Billing.css'
import { BsCreditCard } from "react-icons/bs";

const Billing = ({balance, userId, bills}) => {
    const [amount, setAmount] = useState()
    return (
        <div className="billing container full" id='billing'>
            <div className="stats">
                <div className="info">
                    <p>Balance:</p>
                    <div className="value">
                        {balance}$
                    </div>
                </div>
            </div>
            <form className="add-credit">
                <h2>Add Credit</h2>
                <div className="amount">
                    <div className="amount-input-container">
                        $
                        <input className='amount-input' type='number' placeholder='amount..' />
                    </div>
                    <button type='submit' className="dashboard-button">
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

                    <table className='billing-table'>
                        <tr>
                            <th>Date</th>
                            <th>Amount ($)</th>
                            <th>Status</th>
                        </tr>
                        {
                            bills.map((bill, index) => {
                                return(
                                <tr key={index}>
                                    <td>{bill.date}</td>
                                    <td className='centered-text'>{bill.amount}</td>
                                    <td className='centered-text'>{bill.status}</td>
                                </tr>
                                )
                            })
                        }
                    </table>

                </div>
            </div>
        </div>
    );
}

export default Billing;
import '../styles/screens/Pricing.css'
import Banner from "../components/Banner";

const Pricing = () => {
    return (
        <div className="pricing">
            <Banner title={"Pricing"}/>
            <div className='container'>
                <p>You will be charged on execution time</p>
            </div>
        </div>
    );
}

export default Pricing;
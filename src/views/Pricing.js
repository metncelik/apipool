import Banner from '../components/Banner';
import '../styles/views/Pricing.css'

const Pricing = () => {
    return (
        <div className="pricing-main">
            <Banner color="green"/>
            <h2 className='pricing-title'>Pricing</h2>
            <p className='pricing-description'>Pay as you go and use as much as you want. Our flexible pricing options allow you to scale your usage based on your needs.</p>
            <div className='table-container'>
                <table className='pricing-table'>
                    <thead>
                        <tr>
                            <th>GPU</th>
                            <th>Hardware</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RTX 3090 TI</td>
                            <td>10 GPUs, 10 Cores, 16 GB VRAM</td>
                            <td>$0.0002/sec.</td>
                        </tr>
                        <tr className=''>
                            <td>RTX 4090</td>
                            <td>10 GPUs, 10 Cores, 32GB VRAM</td>
                            <td>$0.0004/sec</td>
                        </tr>
                        <tr>
                            <td>H100</td>
                            <td>10 GPUs, 10 Cores, 128GB VRAM</td>
                            <td>$0.0006/sec</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pricing;
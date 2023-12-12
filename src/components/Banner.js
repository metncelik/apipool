import '../styles/components/Banner.css'

const Banner = ({imageUrl, title}) => {
      const beforeStyle = {
        backgroundImage: `url(${imageUrl})`
      };
    
      return (
        <div className="banner">
          <div className="banner-before" style={beforeStyle}></div>
          <h2 className='banner-title'>{title}</h2>
        </div>
      );
}


export default Banner;
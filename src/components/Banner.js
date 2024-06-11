import '../styles/components/Banner.css'

const Banner = ({image, color, margin, height}) => {
      const beforeStyle = color && !image ? {
        backgroundColor: color
      }:  {
        backgroundImage: `url(${image})`
      };
      beforeStyle.minHeight = height || 250;
      const bannerStyle = {
        height: margin || 0
      }
      return (
        <div className="banner" style={bannerStyle}>
          <div className="banner-before" style={beforeStyle}></div>
        </div>
      );
}


export default Banner;
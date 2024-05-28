import "../styles/components/Loading.css"

const Logo = () => {
  return (
    <div className="loader-container">
      <svg className="loader" viewBox="0 0 50 50">
        <circle className="loader-circle" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>
  )
}

const LoadingSpin = () => {
  return (
    <div>
      <div className="logo-spin">
        <Logo />
      </div>
    </div>
  )
}

const Loading = () => {

  return (
    <div className="loading-container">
      <LoadingSpin />
    </div>
  );
}

export default Loading;
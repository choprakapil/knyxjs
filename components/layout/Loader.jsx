const Loader = () => (
  <div className="loader-wrap">
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
    </svg>
    <div className="loader-wrap-heading">
      <div className="load-text">
        <span>K</span>
        <span>N</span>
        <span>Y</span>
        <span>X</span>
      </div>
    </div>
  </div>
);

export default Loader;

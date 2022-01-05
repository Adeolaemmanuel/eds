const Uploader = ({
  action,
  image,
  imageStyle,
  btnStyle,
  height = window.screen.height,
  btnText,
  isHome,
}) => {
  return (
    <div className="w3-container">
      <div className={`${isHome && "w3-center"}`}>
        <form
          className={`${isHome && "w3-display-middle"}`}
          style={{ width: height }}
        >
          <input
            type="file"
            className="w3-hide"
            id="fileInput"
            onChange={(file) => {
              action(file.target.files[0]);
            }}
          />
          {image && (
            <div className="w3-container">
              <img
                src={image}
                alt="upload-icon"
                style={{ width: 200, ...imageStyle }}
              />
            </div>
          )}
          <label
            htmlFor="fileInput"
            className={`${isHome ? "w3-btn w3-ripple w3-blue w3-round": "w3-btn w3-ripple w3-blue w3-right w3-round"}`}
            style={{ marginTop: isHome && 50, width: 200, ...btnStyle }}
          >
            {btnText}
          </label>
        </form>
      </div>
    </div>
  );
};

export default Uploader;

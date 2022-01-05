const Uploader = ({
  action,
  image,
  imageStyle,
  btnStyle,
  height = window.screen.height,
  btnText,
}) => {
  return (
    <div className="w3-container">
      <div className="w3-center">
        <form className="w3-display-middle" style={{ width: height }}>
          <input
            type="file"
            className="w3-hide"
            id="fileInput"
            onChange={(file) => {
              action(file.target.files[0]);
            }}
          />
          <div className="w3-container">
            <img
              src={image}
              alt="upload-icon"
              style={{ width: 200, ...imageStyle }}
            />
          </div>
          <label
            htmlFor="fileInput"
            className="w3-btn w3-ripple w3-blue w3-round"
            style={{ marginTop: 50, width: 200, ...btnStyle }}
          >
            {btnText}
          </label>
        </form>
      </div>
    </div>
  );
};

export default Uploader;
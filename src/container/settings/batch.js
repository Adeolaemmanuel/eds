import Button from "../../components/button";

const Batch = ({ batch, setbatch, batchHandler }) => {
  return (
    <div className="w3-row-padding">
      <div className="w3-container">
        <p className="w3-padding w3-bold w3-black w3-center">Email Batch</p>
        <p className="w3-padding w3-bold w3-center" style={{margin: 10, backgroundColor: '#ffc107'}}>
          Timer is automticaly set to send mail every minute leave blank or type
          *
        </p>
      </div>
      <form>
        <div className="w3-col s12 m12 l6 w3-padding">
          <div className="w3-center">
            <span className="w3-padding w3-blue w3-margin">Email Filter</span>
          </div>
          <input
            className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
            type="number"
            placeholder="Filter: -Default 50"
            value={batch.filter}
            onChange={(filter) => {
              let data = { ...batch };
              data.filter = filter.target.value;
              setbatch(data);
            }}
          />
        </div>
        <div className="w3-col s12 m12 l6 w3-padding">
          <div className="w3-center">
            <span className="w3-padding w3-blue w3-margin">Batch Timer</span>
          </div>
          <div className="w3-row">
            <div className="w3-col m12 l2">
              <input
                className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
                type="text"
                placeholder="Sec 0-59"
                value={batch.timer.sec}
                onChange={(sec) => {
                  let data = { ...batch };
                  data.timer.sec = sec.target.value;
                  setbatch(data);
                }}
              />
            </div>
            <div className="w3-col m12 l2">
              <input
                className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
                type="text"
                placeholder="Min 0-59"
                onChange={(min) => {
                  let data = { ...batch };
                  data.timer.min = min.target.value;
                  setbatch(data);
                }}
              />
            </div>
            <div className="w3-col m12 l2">
              <input
                className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
                type="text"
                placeholder="Hours 0-23"
                onChange={(hours) => {
                  let data = { ...batch };
                  data.timer.hours = hours.target.value;
                  setbatch(data);
                }}
              />
            </div>
            <div className="w3-col m12 l2">
              <input
                className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
                type="text"
                placeholder="Day of Month 1-31"
                onChange={(dayofM) => {
                  let data = { ...batch };
                  data.timer.dayofM = dayofM.target.value;
                  if (dayofM.target.value === "") data.timer.dayofM = "*";
                  setbatch(data);
                }}
              />
            </div>
            <div className="w3-col m12 l2">
              <input
                className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
                type="text"
                placeholder="Month: 0-11 (Jan-Dec)"
                onChange={(month) => {
                  let data = { ...batch };
                  data.timer.month = month.target.value;
                  setbatch(data);
                }}
              />
            </div>
            <div className="w3-col m12 l2">
              <input
                className="w3-input w3-margin-top w3-padding w3-border w3-border-blue w3-round"
                type="text"
                placeholder="0-6 (Sun-Sat)"
                onChange={(dayofweek) => {
                  let data = { ...batch };
                  data.timer.dayofweek = dayofweek.target.value;
                  setbatch(data);
                }}
              />
            </div>
          </div>
        </div>
      </form>
      <Button
        type="button"
        action={batchHandler}
        style={{ width: 400 }}
        text="Set"
      />
    </div>
  );
};

export default Batch;

import React from "react";

const ClockDisplay = (props) => {
  const { value, label, date, hr, min, sec, meridiem } = props.children[0];
  const onDeleteClock = props.children[1];
  //   console.log(`Clock display : city = ${label} and hr= ${hr}`);
  return (
    <div id={value} className="clock-display">
      <div>
        <div>
          <button onClick={() => onDeleteClock(value)}>
            <span>
              <i className="blue circular inverted close icon"></i>
            </span>
          </button>
        </div>
        <h2>
          {label} : {date}
        </h2>
      </div>
      <div className="time">
        <div>
          <span>{hr}</span>
          <span>Hours</span>
        </div>
        <div>
          <span>{min}</span>
          <span>Minutes</span>
        </div>
        <div>
          <span>{sec}</span>
          <span>Secs</span>
        </div>
        <div>
          <span>{meridiem}</span>
        </div>
      </div>
    </div>
  );
};

export default ClockDisplay;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { allTimeZones } from "./ClockGlobal";

const uniqueTimezones = [];

const ClocksForm = (props) => {
  const [saveClock, resetClock] = props.children;

  const [currentSelectedOptions, setCurrentSelectedOptions] = useState([]);

  useEffect(() => {
    for (const timezone in allTimeZones) {
      if (!uniqueTimezones.includes(timezone)) {
        uniqueTimezones.push({
          value: timezone,
          label: timezone.split("/")[1],
        });
      }
    }
  }, []);

  const onSelectChange = (selectedItems) => {
    setCurrentSelectedOptions(selectedItems);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    saveClock(currentSelectedOptions);
    setCurrentSelectedOptions([]);
  };

  const onResetClick = (e) => {
    e.preventDefault();
    setCurrentSelectedOptions([]);
    resetClock();
  };
  return (
    <>
      <div className="clock-form-container">
        <div className="clock-form-section ui form ">
          <div className="field">
            <form onSubmit={(e) => onFormSubmit(e)}>
              <Select
                className="clock-form-select"
                isMulti={true}
                value={currentSelectedOptions}
                onChange={onSelectChange}
                options={uniqueTimezones}
                isSearchable="false"
                placeholder={
                  <div className="clock-form-select-placeholder">
                    Select timezones
                  </div>
                }
                maxMenuHeight={110}
              />
              <div className="ui inverted clock-form-buttons">
                <input
                  type="submit"
                  value={"SAVE"}
                  name={"save"}
                  className="ui inverted yellow button clock-form-save"
                  disable={currentSelectedOptions.length ? "false" : "true"}
                ></input>

                <input
                  type="reset"
                  value={"RESET"}
                  name={"reset"}
                  className="ui inverted yellow button "
                  onClick={onResetClick}
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ClocksForm);

// const [prevSelectedOptions, setPrevSelectedOptions] = useState([]);
// let allOptions = [...prevSelectedOptions, ...currentSelectedOptions];
// var uniqueOptions = _.uniq(allOptions, "value");
// for (const ele of currentSelectedOptions) {
//   console.log(`currentSelectedOptions = ${ele.value}`);
// }
// setPrevSelectedOptions(uniqueOptions);

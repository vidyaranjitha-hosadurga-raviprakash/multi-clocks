import React, { useCallback, useEffect, useState } from "react";
import "../static/css/Clocks.css";
import ClockDisplay from "./ClockDisplay";
import ClocksForm from "./ClocksForm";
import Loader from "./Loader";

import { allTimeZones, defaultClocks } from "./ClockGlobal";

const getDateTime = (timezones) => {
  var date = new Date();
  let cityTimings = [];

  // value= timezone ; lable = cityname
  timezones.map((items, index) => {
    const { value } = timezones[index];
    const [dateNow, timeNow] = date
      .toLocaleString("en-IN", {
        dateStyle: "long",
        timeStyle: "medium",
        hour12: true,
        timeZone: value,
      })
      .split("at");
    const time = timeNow.split(/[ :]+/);
    cityTimings = [
      ...cityTimings,
      {
        ...items,
        date: dateNow,
        hr: time[1],
        min: time[2],
        sec: time[3],
        meridiem: time[4].toUpperCase(),
      },
    ];
    return 0;
  });
  return cityTimings;
};

const Clocks = () => {
  const [clocks, setClocks] = useState(defaultClocks);

  // console.log(`Rendering the Clock - parent and clocks len = ${clocks.length}`);

  useEffect(() => {
    if (clocks.length) {
      const timerId = setInterval(() => {
        const dateTime = getDateTime(clocks);
        setClocks(dateTime);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [clocks]);

  useEffect(() => {
    // Fetching from the local storage
    const fetchedClocksFromLocalStorage = [];
    const storedTimezones = { ...localStorage };
    for (const key in storedTimezones) {
      // Filtering out only timezone/clocks from the local storage
      if (allTimeZones[key]) {
        fetchedClocksFromLocalStorage.push({
          value: key,
          label: storedTimezones[key],
        });
      }
    }
    setClocks(fetchedClocksFromLocalStorage);
  }, []);

  const saveClock = useCallback(
    (submittedOptions) => {
      const allOptions = [...clocks, ...submittedOptions];
      const values = allOptions.map((o) => o.value);
      const uniqueOptions = allOptions.filter(
        ({ value }, index) => !values.includes(value, index + 1)
      );

      //So has to display the clock immediately, calling the getDateTime()
      const dateTime = getDateTime(uniqueOptions);
      setClocks(dateTime);

      // Adding to local storage.
      for (const option of uniqueOptions) {
        localStorage.setItem(option.value, option.label);
      }
    },
    [clocks]
  );

  const resetClock = useCallback(() => {
    setClocks(defaultClocks);
    localStorage.clear();
  }, []);

  const deleteClock = (timezone) => {
    const newClocks = clocks.filter((item, index) => {
      return item.value !== timezone;
    });
    setClocks(getDateTime(newClocks));
    localStorage.removeItem(timezone);
  };

  const renderClocks = () => {
    return clocks.map((clock) => {
      return (
        <ClockDisplay key={clock.value}>
          {clock}
          {deleteClock}
        </ClockDisplay>
      );
    });
  };

  return (
    <>
      <ClocksForm>
        {saveClock}
        {resetClock}
      </ClocksForm>

      <div className="ui container clocks-container ">
        {clocks.length && clocks[0].date ? (
          <div className="clocks-render">{renderClocks()}</div>
        ) : clocks.length ? (
          <>
            <div className="clocks-loader">
              <Loader
                loaderText="Loading ....."
                loaderType="ClockLoader"
              ></Loader>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Clocks;

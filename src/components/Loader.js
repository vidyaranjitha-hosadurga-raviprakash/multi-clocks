import React from "react";
import "../static/css/Clocks.css";
import ClockLoader from "react-spinners/ClockLoader";
import DefaultLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  color: white !important;
  padding: 1rem 1rem;
`;
export default function Loader(props) {
  const { loaderText, loaderType } = props;

  const renderLoader = (loaderType) => {
    switch (loaderType) {
      case "ClockLoader":
        return (
          <>
            <div className="clock-loader-icon">
              <ClockLoader
                size={60}
                css={override}
                speedMultiplier={3}
                color={"white"}
              ></ClockLoader>
            </div>
          </>
        );
      default:
        return (
          <DefaultLoader
            size={60}
            css={override}
            speedMultiplier={3}
            color={"white"}
          ></DefaultLoader>
        );
    }
  };
  return (
    <>
      <div className="ui container clock-loader-container">
        <div className="clock-loader-icon">{renderLoader(loaderType)}</div>
        <div className="clock-loader-text">{loaderText}</div>
      </div>
    </>
  );
}

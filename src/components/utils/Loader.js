import React from "react";
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
            <ClockLoader
              size={60}
              css={override}
              speedMultiplier={3}
              color={"white"}
            ></ClockLoader>
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
      <div className="ui container loader-container">
        <div className="loader-icon">{renderLoader(loaderType)}</div>
        <div className="loader-text">{loaderText}</div>
      </div>
    </>
  );
}

import React from "react";
import "./index.scss";

interface Props {
  spinning: boolean;
}

const Spin: React.FC<Props> = ({ spinning }) => {
  return (
    <>
      {spinning && (
        <div className="spin d-flex align-items-center justify-content-center">
          <div></div>
          <img src="/assets/images/reddevil-loader.svg" alt="" />
        </div>
      )}
    </>
  );
};

export default Spin;

import React from "react";
import { SyncLoader } from "react-spinners";

function LoadingComponents({size}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <SyncLoader size={size || 35} color={"var(--clr-primary)"} />
    </div>
  );
}

export default LoadingComponents;

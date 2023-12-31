import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-end justify-center">
      <MutatingDots
        height="100"
        width="100"
        color="#7C81AD"
        secondaryColor="#C3ACD0"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

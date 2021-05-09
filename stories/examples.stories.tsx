import React, { useEffect, useState } from "react";
import { Imagify } from "../src";

export default {
  title: "examples",
};

export const HelloWorld = () => {
  return (
    <div>
      <Imagify width={400} height={300}>
        <div style={{ fontSize: "40px" }}>
          <em>I</em> like{" "}
          <span style={{ color: "white", textShadow: "0 0 2px blue" }}>
            cheese
          </span>
        </div>
      </Imagify>
    </div>
  );
};

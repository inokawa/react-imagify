import React, { useEffect, useState } from "react";
import { Imagify } from "../src";

export default {
  title: "examples",
};

export const HelloWorld = () => {
  return (
    <div>
      <Imagify width={400} height={100}>
        <div style={{ fontSize: "40px" }}>
          <em>I</em> like{" "}
          <span style={{ color: "white", textShadow: "0 0 2px blue" }}>
            cheese
          </span>
        </div>
      </Imagify>
      <div style={{ fontSize: "40px" }}>
        <em>I</em> like{" "}
        <span style={{ color: "white", textShadow: "0 0 2px blue" }}>
          cheese
        </span>
      </div>
    </div>
  );
};
    </div>
  );
};

export const WithState = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("textarea");
  return (
    <div>
      <Imagify width={200} height={400}>
        <div>
          <div style={{ background: count % 2 === 0 ? "pink" : "skyblue" }}>
            {count}
          </div>
          <div style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
            {text}
          </div>
        </div>
      </Imagify>
      <div>
        <button onClick={() => setCount((p) => p + 1)}>
          update count: {count}
        </button>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

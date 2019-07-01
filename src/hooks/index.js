import { useState } from "react";

export const useField = type => {
  const [value, setVlaue] = useState("");

  const onChange = e => {
    setVlaue(e.target.value);
  };

  return { type, value, onChange };
};

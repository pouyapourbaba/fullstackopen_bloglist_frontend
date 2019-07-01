import { useState } from "react";

export const useField = type => {
  const [value, setVlaue] = useState("");

  const onChange = e => {
    setVlaue(e.target.value);
  };

  const onReset = () => {
    setVlaue("");
  };

  return { type, value, onChange, onReset };
};

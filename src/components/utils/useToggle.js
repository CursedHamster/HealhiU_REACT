import { useState } from "react";

function useToggle(state) {
  const [toggler, setToggler] = useState(state);

  const toggle = () => {
    setToggler((prev) => !prev);
  };

  return [toggler, toggle];
}

export default useToggle;

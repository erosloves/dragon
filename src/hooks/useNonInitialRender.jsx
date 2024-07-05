import { useEffect, useRef } from "react";

const useNonInitialRender = (fn, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log("running");
    }
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    return fn();
  }, []);
};

export default useNonInitialRender;

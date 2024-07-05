import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useNonInitialEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      return effect();
    }
  }, [deps]);
};

export default useNonInitialEffect;

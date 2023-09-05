import { useLocation } from "react-router-dom";

// Custom hook that wraps useLocation
function useLocationWithinRouter() {
  return useLocation();
}

export default useLocationWithinRouter;

import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import trackPathForAnalytics from "../firebase/TrackPageForAnalytics";

export default function Analytics() {
  const { pathname } = useLocation();

  const analytics = useCallback(() => {
    trackPathForAnalytics({ path: pathname });
  }, [pathname]);

  useEffect(() => {
    analytics();
  }, [analytics]);

  return null;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga';

const TRACKING_ID = process.env.REACT_APP_API_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

export default function Analytics() {
    const { pathname } = useLocation()

    useEffect(() => {
        ReactGA.pageview(pathname);
      }, [pathname]);

    return null
}
import "styles/globals.css";
import "styles/navbar.css";
import "styles/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppWrapper } from "util/AppManager";
import { library } from "@fortawesome/fontawesome-svg-core";
import Router, { useRouter, withRouter } from "next/router";
import NProgress from "nprogress";

import {
  faBorderAll,
  faList,
  faSearch,
  faAngleDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { fab } from "@fortawesome/free-brands-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";

library.add(faList, faBorderAll, faSearch, faAngleDown, fab, faBars, faTimes);

function MyApp({ Component, pageProps }) {
  Router.onRouteChangeStart = () => {
    // console.log('onRouteChangeStart triggered');
    NProgress.start();
  };

  Router.onRouteChangeComplete = () => {
    // console.log('onRouteChangeComplete triggered');
    NProgress.done();
  };

  Router.onRouteChangeError = () => {
    // console.log('onRouteChangeError triggered');
    NProgress.done();
  };

  const { locale } = useRouter();

  // useEffect(() => {
  //   alert("Hello! I am an alert box!!");
  // }, [locale]);

  return (
    <AppWrapper>
      <Component {...pageProps} locale={locale} />
    </AppWrapper>
  );
}

export default withRouter(MyApp);

import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/main.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const start = () => NProgress.start();
    const stop = () => NProgress.done();
    Router.events.on("routeChangeStart",start);
    Router.events.on("routeChangeComplete",stop);
    Router.events.on("routeChangeError", stop);
    return () =>{
      Router.events.off("routeChangeStart",start);
      Router.events.off("routeChangeComplete",stop);
      Router.events.off("routeChangeError", stop);

    }
  }, []);


  return <Component {...pageProps} />
}

export default MyApp

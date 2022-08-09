import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../styles/main.css';
import NavBar from '../components/NavBar';
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'

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

  const router = useRouter()
  const [loggedin, setloggedin] = useState("false")
  const isLoggedIn = async () => {
		const res = await fetch(`http://localhost:3000/api/authed`)
		  const user = await res.json()
		  if ((user == 403) || (user == 401)) {return 401}else{return 200}
	  }

    useEffect(() => {
      isLoggedIn().then(value => {
        if (value == 200){setloggedin("true")}else{setloggedin("false")}
        console.log("app checked for user credentials and responded with "+value);
      }).catch(err => {
        console.log(err);
      });
    }, [router.pathname])
  return(
  <>
    {loggedin == "true" ?
    <div class="flex">
      <NavBar authed={loggedin}/>
      <Component {...pageProps} />
    </div>
    :
    <div>
      <NavBar authed={loggedin}/>
      <Component {...pageProps} />
    </div>
    
    }
    
  </>
  )
}

export default MyApp
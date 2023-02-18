import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

//this override the default App
//for global styles! and they can be imported only here

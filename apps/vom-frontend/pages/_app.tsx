import React from 'react';
import App from 'next/app';
//import ThemeProvider from '../containers/ThemeProvider';
// import 'antd/dist/antd.css';
// import '@glidejs/glide/dist/css/glide.core.min.css';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.core.css';
import '../style/global.css';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
        // <ThemeProvider>
          <Component {...pageProps} />
        // </ThemeProvider>
    );
  }
}

export default CustomApp;

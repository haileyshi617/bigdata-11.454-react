import React from 'react';

import ProgressBar from './ProgressBar';
// import CustomCursor from './CustomCursor';
import Footer from './Footer';

function Layout(props) {
  return (
    <div className="layout">
      {/* <CustomCursor /> */}
      <ProgressBar />
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

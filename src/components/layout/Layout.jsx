import React from 'react';

import ProgressBar from './ProgressBar';
import Footer from './Footer';

function Layout(props) {
  return (
    <div className="layout">
      <ProgressBar />
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

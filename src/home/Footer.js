import React from 'react';
// don't reimport css files that have already been imported
import '../style/mystyle.css';

// is this file used???

export default function Footer() {
  return (
    <footer className="footer hero is-info">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <h3>Mother's Milk</h3> by <a href="">Team Mother's Milk</a>           
          </p>
        </div>
      </div>
    </footer>
  );
}
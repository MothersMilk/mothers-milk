import React, { Component } from 'react';
import { connect } from 'react-redux';

class DropSites extends Component {

  render() {

    const { dropSites } = this.props;
    const listDropSites = dropSites.map((dropSite) => (
      <li key={dropSite._id}>
        {dropSite.name}<br/>
        {dropSite.address}<br/>
        {dropSite.hours}
      </li>
    ));
    
    return (
      <div className="tile is-parent">
        <div className="tile is-child box">
          <h2 className="subtitle">Locations</h2>
          <ul>
            {listDropSites}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ dropSites }) => ({ dropSites }),
  null
)(DropSites);
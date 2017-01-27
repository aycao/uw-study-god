import React from 'react';

import uwLogo from '../../assets/UniversityOfWaterloo_logo_horiz_colour_rev/UniversityOfWaterloo_logo_horiz_rev_rgb.png';

const Header = () => {

  return (
    <div className="page-header">
      <div className="header-bar-container">
        <div className="container">
          <div className="logo-container col-md-3">
            <img id="logo" src={uwLogo} alt="UW Logo"/>
          </div>
          <div className="col-md-9">
            <h2>UW Course God</h2>
          </div>
        </div>
      </div>
      <div className="colour-canvas-container">
        <div className="colour-canvas-bar col-md-3" id="canvas-1"></div>
        <div className="colour-canvas-bar col-md-3" id="canvas-2"></div>
        <div className="colour-canvas-bar col-md-3" id="canvas-3"></div>
        <div className="colour-canvas-bar col-md-3" id="canvas-4"></div>
      </div>
    </div>
  )

};

export default Header;

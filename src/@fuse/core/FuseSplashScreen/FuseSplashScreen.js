import { memo } from 'react';

function FuseSplashScreen() {
  return (
    <div id="fuse-splash-screen">
      <div className="center">
        <div className="logo">
          <img width="128" src={`${process.env.PUBLIC_URL}/assets/images/logos/FoxConnect_icon_512.png`} alt="logo" />
        </div>
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="inner">
              <div className="gap" />
              <div className="left">
                <div className="half-circle" />
              </div>
              <div className="right">
                <div className="half-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FuseSplashScreen);

import React from "react";

const LoadingCat = () => {
  return (
    <>
      <style>{`
        #loading {
          position: fixed;
          inset: 0;
          background: #fff;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cat {
          position: relative;
          width: 100%;
          max-width: 20em;
          overflow: hidden;
          background-color: #e6dcdc;
        }

        .cat::before {
          content: '';
          display: block;
          padding-bottom: 100%;
        }

        .cat > * {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          animation: rotating 2.79s cubic-bezier(.65, .54, .12, .93) infinite;
        }

        .cat > *::before {
          content: '';
          position: absolute;
          width: 50%;
          height: 50%;
          background-size: 200%;
          background-repeat: no-repeat;
          background-image: url('https://images.weserv.nl/?url=i.imgur.com/M1raXX3.png&il');
        }

        .cat__head::before {
          top: 0;
          right: 0;
          background-position: 100% 0%;
          transform-origin: 0% 100%;
          transform: rotate(90deg);
        }

        .cat__tail::before {
          left: 0;
          bottom: 0;
          background-position: 0% 100%;
          transform-origin: 100% 0%;
          transform: rotate(-30deg);
        }

        .cat__body::before {
          right: 0;
          bottom: 0;
          background-position: 100% 100%;
          transform-origin: 0% 0%;
        }

        .cat__body:nth-of-type(2) {
          animation-delay: .2s;
        }

        .cat__tail {
          animation-delay: .2s;
        }

        .cat__body {
          animation-delay: .1s;
        }

        @keyframes rotating {
          from { transform: rotate(720deg); }
          to { transform: none; }
        }
      `}</style>

      <div id="loading">
        <div className="cat">
          <div className="cat__head"></div>
          <div className="cat__body"></div>
          <div className="cat__body"></div>
          <div className="cat__tail"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingCat;

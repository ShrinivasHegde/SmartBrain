

import React from 'react'
import './FaceRecognition.css'

window.process = {}
const FaceRecogniction = ({ imgUrl, box }) => {
 
    //console.log(box)
    //console.log(imgUrl)

    return (
      <div className="center" style={{ display: 'inline-block', position: 'relative' }}>
        <img
          id="inputImage"
          src={imgUrl}
          alt=""
          style={{ height: "auto", width:"300px" }}
        />
        <div className='bounding-box' 
            style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
            }} >   
        </div>
      </div>
    );
  };
   
  export default FaceRecogniction;

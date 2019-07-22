import React from 'react';
import './FaceRecognition.css';
import FaceBoxes from './FaceBoxes';

const FaceRecognition = ({url, boxes}) =>{

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' alt='' src={url} width='500px' height='auto' />
        <FaceBoxes boxes={boxes}/>

      </div>
    </div>
  );
}

export default FaceRecognition;

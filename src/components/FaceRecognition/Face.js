import React from 'react';

import './FaceRecognition.css'

const Face =({top_row, right_col, left_col, bottom_row}) => {

  return(
    <div className='bounding-box'
         style={{top: top_row,
                 right: right_col,
                 left: left_col,
                 bottom: bottom_row}} >
    </div>

  );
}
export default Face;

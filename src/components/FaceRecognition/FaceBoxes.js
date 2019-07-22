import React from 'react';
import Face from './Face';

const FaceBoxes =({boxes}) => {
  return (
    <div id='boxes'>
      {
        boxes.map( (box, i) => {
          return (
            <Face
              top_row = {boxes[i].top_row}
              right_col = {boxes[i].right_col}
              left_col = {boxes[i].left_col}
              bottom_row = {boxes[i].bottom_row}
            />
          );
        })
      }
    </div>
  );
}
export default FaceBoxes;

import React from 'react';



function EventHighlighter (props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: props.top,
        left: props.left,
        height: props.height,
        props: props.width,
        background: 'green',
      }}
    >
      {props.title}
    </div>
  );
}

export default EventHighlighter;

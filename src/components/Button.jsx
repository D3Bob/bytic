import React from 'react';




function Button(props) {


  return (
        <button 
        className={props.classMode} 
        style={props.styleMode} 
        onClick={props.click}
        >
          {props.val}
        </button>
  );
}

export default Button;

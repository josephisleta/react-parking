import React from 'react';

const Card = (props) => {
  return (
      <div className="card form-container">{props.children}</div>
  );
};

export default Card;
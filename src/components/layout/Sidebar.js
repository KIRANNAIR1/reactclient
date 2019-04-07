import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="col">
      <Link to="/client/add" type="button" className="btn btn-success btn-sm">
        <div className="fas fa-plus">New</div>
      </Link>
    </div>
  );
};

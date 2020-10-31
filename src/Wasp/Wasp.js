import React, { useEffect, useState } from 'react';

import './Wasp.scss';

const Wasp = (props) => {
  const { darkMode, itemsToList, onReorder } = props;

  const [allStrings, setAllStrings] = useState(true);
  const [items, setItems] = useState([]);

  return (
    <React.Fragment>
      <p className="text-danger">testing!</p>
    </React.Fragment>
  );
};

export default Wasp;

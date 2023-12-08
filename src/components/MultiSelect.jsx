import React, { useState } from 'react';
import Select from 'react-select';
import styledComponents from 'styled-components';

const SELECT = styledComponents(Select)`width: 100%;
padding: 10px;
margin-bottom: 20px;
border: none;
border-radius: 5px;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
width:'50%';
outline:none
`;

const MultiSelect = ({ onChange }) => {
  const options = [
    { value: '2 wheeler', label: '2 wheeler' },
    { value: '4 wheeler', label: '4 wheeler' },
    { value: 'heavy vehicle', label: 'heavy vehicle' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };
  onChange(selectedOptions);
  return (
    <div className="SelectClass">
      <SELECT
        id="multi-select"
        options={options}
        value={selectedOptions}
        onChange={handleSelectChange}
        placeholder="Lisence Type"
        isMulti
      />
    </div>
  );
};

export default MultiSelect;

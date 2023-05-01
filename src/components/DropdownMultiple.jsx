import React from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const DropdownMultiple = ({ options, name, filters, setFilters }) => {
  function handleDropdownChange(event, data) {
    setFilters(data.value);
  }
  return (
    <div style={{ padding: "5px 2px" }}>
      <Dropdown
        placeholder={name}
        fluid
        multiple
        selection
        options={options}
        onChange={handleDropdownChange}
        value={filters}
      />
    </div>
  );
};

export default DropdownMultiple;

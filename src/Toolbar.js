import React from "react";
import { PropTypes } from "prop-types";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export const Toolbar = (props) => {
  console.log(props);
  const getButtons = (farms) => {
    if (!farms || farms.length === 0) return;
    return farms.map((farm, idx) => <Button key={idx}>{farm}</Button>);
  };

  const farmButtons = getButtons(props.farms);

  return (
    <div id="toolbar">
      <ButtonGroup disableElevation={true} fullWidth={true} variant="contained">
        <Button>All</Button>
        {farmButtons}
      </ButtonGroup>
    </div>
  );
};

Toolbar.propTypes = {
  farms: PropTypes.array.isRequired,
};

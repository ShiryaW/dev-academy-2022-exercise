import React from "react";
import PropTypes from "prop-types";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export const Toolbar = ({ farms, onButtonClick }) => {
  const getButtons = (farms) => {
    if (!farms || farms.length === 0) return;
    return farms.map((farm, idx) => (
      <Button key={idx} onClick={onButtonClick}>
        {farm.name}
      </Button>
    ));
  };

  const farmButtons = getButtons(farms);
  const hasLoaded = farms.length > 0;

  return (
    <div id="toolbar">
      <ButtonGroup disableElevation={true} fullWidth={true} variant="contained">
        {!hasLoaded ? (
          <Button key="loading">Loading farm data...</Button>
        ) : (
          <>
            <Button key="all" onClick={onButtonClick}>
              All
            </Button>
            {farmButtons}
          </>
        )}
      </ButtonGroup>
    </div>
  );
};

Toolbar.propTypes = {
  farms: PropTypes.array.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

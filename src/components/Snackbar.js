import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

const MySnackbar = ({ message }) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={true}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{message}</span>}
      />
    </div>
  );
};

export default MySnackbar;

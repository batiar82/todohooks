import React, { createContext, useState, Fragment } from "react";
import { Snackbar } from "@material-ui/core";

export const SnackbarContext = createContext(null);

const SnackbarContextProvider: React.FC = ({ children }) => {
  const [text, setText] = useState("");
  const setOpen = (text: string) => {
    setText(text);
  };
  const onClose = () => {
    setText("");
  };
  return (
    <Fragment>
      <SnackbarContext.Provider value={[setOpen]}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={!!text.length}
        autoHideDuration={4000}
        onClose={onClose}
        message={text}
      />
    </Fragment>
  );
};

export default SnackbarContextProvider;

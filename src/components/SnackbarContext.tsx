import React, { createContext, useState, Fragment, Dispatch, SetStateAction } from "react";
import { Snackbar } from "@material-ui/core";

export const SnackbarContext = createContext([(foo: string) => {}]);

const SnackbarContextProvider: React.FC = ({ children }) => {
  const [text, setText] = useState("");
  const onClose = () => {
    setText("");
  };
  return (
    <Fragment>
      <SnackbarContext.Provider value={[setText]}>
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

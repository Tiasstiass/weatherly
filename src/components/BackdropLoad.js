import { Backdrop, CircularProgress } from '@material-ui/core';

function BackdropLoad(open) {
  return (
    <Backdrop open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default BackdropLoad;

import { Backdrop, CircularProgress } from '@material-ui/core';

function BackdropLoad(props) {
  return (
    <Backdrop open={props.open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default BackdropLoad;

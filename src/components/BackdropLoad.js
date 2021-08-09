import { Backdrop, CircularProgress } from '@material-ui/core';

export default function BackdropLoad(props) {
  return (
    <Backdrop open={props.open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

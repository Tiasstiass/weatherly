import { Backdrop, CircularProgress } from '@material-ui/core';

const styles = {
  height: '100vh',
  width: '100vw',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#00000055',
};
export default function BackdropLoad(props) {
  return (
    <Backdrop style={styles} open={props.open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

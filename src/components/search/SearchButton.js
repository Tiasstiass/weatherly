import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  position: 'absolute',
  top: '0',
  right: '0',
  padding: 'clamp(1.1em, 2vw, 1.5em)',
  borderRadius: '0',
};
export default function SearchButton() {
  return (
    <Button style={styles} type="submit" variant="contained" color="primary">
      <SearchIcon fontSize="large" />
    </Button>
  );
}

import Input from './Input';
import SearchButton from './SearchButton';

function Search(props) {
  return (
    <Input {...props}>
      <SearchButton />
    </Input>
  );
}

export default Search;

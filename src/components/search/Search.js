import Input from './Input';
import SearchButton from './SearchButton';

export default function Search(props) {
  return (
    <Input {...props}>
      <SearchButton />
    </Input>
  );
}

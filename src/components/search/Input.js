import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, withStyles } from '@material-ui/core';

const StyledAutocomplete = withStyles({
  root: {
    maxWidth: '25rem',
  },
  input: {
    color: '#fff',
  },
  paper: {
    width: '25rem',
    color: '#fff',
    backdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  noOptions: {
    color: '#fff',
  },
  loading: {
    color: '#fff',
  },
  popupIndicator: {
    color: '#b6c0c6',
  },
  clearIndicator: {
    color: '#b6c0c6',
  },
})(Autocomplete);

const StyledTextField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: '#b6c0c6',
    },
    '& .MuiInput-underline': {
      '&:hover:not(.Mui-disabled)::before': {
        borderBottom: '2px solid #e1beaa',
      },
      '&:before': {
        borderBottom: '1px solid #b6c0c6',
      },
    },
  },
})(TextField);

function Input(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <StyledAutocomplete
        loading={props.loading ?? true}
        loadingText="Searching..."
        noOptionsText={
          props.error && props.input && props.input.length > 1 ? (
            <p className="error-message-input">
              Choose a city from the list and search
            </p>
          ) : (
            'No results found'
          )
        }
        options={props.options}
        autoHighlight={true}
        getOptionLabel={(option) =>
          `${option.city}, ${option.country}, (${option.state})`
        }
        getOptionSelected={(option, value) => option.id === value.id}
        onInputChange={props.handleChange}
        onChange={props.handleSelect}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            color="secondary"
            label="Enter city name"
          />
        )}
      />
      {props.children}
    </form>
  );
}

export default Input;

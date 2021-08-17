import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    width: '70%',
    maxWidth: '20rem',
    [theme.breakpoints.up('desktop')]: {
      maxWidth: '25rem',
    },
    '& .MuiAutocomplete-input': {
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      color: '#fff',
    },
    '& .MuiAutocomplete-popupIndicator': {
      color: '#b6c0c6',
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: '#b6c0c6',
    },
  },

  paper: {
    width: '100%',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    color: '#fff',
    backdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

    '& .MuiAutocomplete-noOptions': {
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      color: '#fff',
    },
    '& .MuiAutocomplete-loading': {
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      color: '#fff',
    },
  },

  textField: {
    '& .MuiFormLabel-root': {
      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
      color: '#fff',
      [theme.breakpoints.up('desktop')]: {
        color: '#b6c0c6',
      },
    },
    '& .MuiInput-underline': {
      '&:hover:not(.Mui-disabled)::before': {
        borderBottom: '2px solid #e1beaa',
      },
      '&:before': {
        borderBottom: '1px solid #fff',
        [theme.breakpoints.up('desktop')]: {
          borderBottom: '1px solid #b6c0c6',
        },
      },
    },
  },
}));

function Input(props) {
  const classes = useStyles();

  return (
    <form onSubmit={props.handleSubmit}>
      <Autocomplete
        classes={{ root: classes.autocomplete, paper: classes.paper }}
        loading={props.loading ?? true}
        loadingText="Searching..."
        noOptionsText={'No results found'}
        options={props.options}
        autoHighlight={true}
        getOptionLabel={(option) =>
          `${option.city}, ${option.country}, (${option.state})`
        }
        getOptionSelected={(option, value) => option.id === value.id}
        onInputChange={props.handleChange}
        onChange={props.handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            classes={{ root: classes.textField }}
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

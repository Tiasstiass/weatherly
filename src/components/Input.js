import { useState, useRef } from 'react';
import { getAutocomplete } from '../api/Api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, withStyles } from '@material-ui/core';
import SearchButton from './SearchButton';
import styled from 'styled-components';
// import { CircularProgress } from '@material-ui/core';

// const CustomPaper = (props) => {
//   return (
//     <Paper
//       {...props}
//       style={{
//         width: '25rem',
//         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//         color: '#fff',
//         backdropFilter: 'blur(15px)',
//       }}
//     />
//   );
// };

// const StyledAutocomplete = styled(Autocomplete)`
//   .MuiInputBase-root {
//     width: 25rem;
//     color: rgba(255, 255, 255);
//   }

//   .MuiFormLabel-root {
//     color: #b6c0c6;
//   }

//   .MuiInput-underline::before {
//     border-bottom: 1px solid #b6c0c6;
//   }

//   .MuiInput-underline:hover:not(.Mui-disabled)::before {
//     border-bottom: 2px solid #e1beaa;
//   }

//   .MuiSvgIcon-root {
//     color: #b6c0c6;
//   }
//   .Mui-focused {
//   }
// `;

const StyledAutocomplete = withStyles({
  root: {
    width: '25rem',
  },
  input: {
    color: '#fff',
  },
  option: {
    '&:valid': {
      backgroundColor: '#000',
    },
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

const StyledTextField = styled(TextField)`
  .MuiFormLabel-root {
    color: #b6c0c6;
  }
  .MuiInput-underline {
    &:hover:not(.Mui-disabled)::before {
      border-bottom: 2px solid #e1beaa;
    }
    &:before {
      border-bottom: 1px solid #b6c0c6;
    }
  }
`;

const Input = ({ setCity, callApi }) => {
  const input = useRef(' ');
  const [list, setList] = useState([]);
  const [cityInfo, setCityInfo] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    input.current = e.target.value;

    if (input.current && input?.current.length > 0) {
      setLoading(true);
      getAutocomplete(input.current)
        .then((res) => {
          // console.log(res);
          let listItems = [...res.data.features].map((obj) => ({
            id: obj.properties.place_id,
            city: obj.properties.city,
            country: obj.properties.country,
            state: obj.properties.state_code || obj.properties.state || '',
            lat: obj.properties.lat,
            lon: obj.properties.lon,
          }));
          setList(listItems);
          setLoading(false);
        })
        .catch((err) => err);
    }
  };

  // Handle selected item
  const handleSelect = (e, value, reason) => {
    if (reason === 'select-option') {
      setCityInfo(value);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityInfo.city);
    callApi(cityInfo.lat, cityInfo.lon);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledAutocomplete
        loading={loading ? true : false}
        onOpen={(e) => {
          setList([]);
        }}
        // loading={true}
        noOptionsText={'No results'}
        options={list}
        getOptionLabel={(option) =>
          `${option.city}, ${option.country}, (${option.state})`
        }
        getOptionSelected={(option, value) => option.id === value.id}
        onChange={handleSelect}
        onInputChange={handleChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            color="secondary"
            label="Enter city name"
          />
        )}
        // PaperComponent={CustomPaper}
      />
      <SearchButton />
    </form>
  );
};

export default Input;

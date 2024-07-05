// import { Autocomplete, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { getCountry } from "../api/country";
import { useCountryStore } from "../stores/store";
import { Autocomplete, TextField, Typography } from "@mui/joy";

const CountryForm = () => {
  const [listCountries, setListCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectCountry } = useCountryStore();
  
  const handleInputChange = async (event, value) => {
    if (value.length >= 3) {
      setLoading(true);
      try {
        const data = await getCountry(value);
        setListCountries(data.data);
      } catch (error) {
        setListCountries([])
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCountryChange = (event, value) => {
    if (value) {
      selectCountry(value.kd_negara);
    } else {
      selectCountry('');
    }
  };

  return (
    <div className='py-3 px-10 flex gap-3'>
      <Typography variant="plain" className="basis-1/4 !font-PT-Sans">Negara :</Typography>
      <div className="flex-grow basis-3/4" >
        <Autocomplete
          loading={loading}
          loadingText="Sedang memuat..."
          className="w-full !font-PT-Sans"
          options={listCountries}
          placeholder="Negara"
          required
          getOptionLabel={(option) => option.ur_negara}
          onChange={handleCountryChange}
          onInputChange={handleInputChange}
          renderInput={(params) => <TextField {...params} label="Negara" />}
        />
      </div>
    </div>
  )
}

export default CountryForm

import { useCountryStore } from "../stores/store";
import { useState } from "react";
import { getPort } from "../api/port";
import { Autocomplete, TextField, Typography } from "@mui/joy";

const PortForm = () => {
  const { country } = useCountryStore();
  const [listPort, setListPort] = useState([]);

  const handleInputChange = async (event, value) => {
    if (value.length >= 3 && country) {
      try {
        const data = await getPort({ 
          kd_negara: country,
          value_search: value
        });
        setListPort(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='py-3 flex gap-3 px-10'>
      <Typography variant="plain" className={`basis-1/4 !font-PT-Sans`}>Pelabuhan :</Typography>
      <div className="flex-grow basis-3/4">
        <Autocomplete
          className="!font-PT-Sans"
          disabled={!country}
          placeholder="Pelabuhan"
          options={listPort}
          getOptionLabel={(option) => option.ur_pelabuhan}
          onInputChange={handleInputChange}
          renderInput={(params) => <TextField {...params} label="Pelabuhan" />}
        />
      </div>
    </div>
  )
}

export default PortForm
import { Input, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import { useKodeBarangStore } from "../stores/store"
import { getBeaMasuk } from "../api/bea-masuk"

const BeaMasuk = () => {
  const { hs_code } = useKodeBarangStore();
  const [beaMasuk, setBeaMasuk] = useState(0);
  const [harga, setHarga] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if(hs_code){
      const fetchBeaMasuk = async () => {
        try {
          const data = await getBeaMasuk(hs_code);
          setBeaMasuk(data.data[0].bm);
        } catch (error) {
          console.log(error)
        }
      }
      fetchBeaMasuk();
    } else {
      setBeaMasuk(0)
    }
  }, [hs_code]);

  const handleChangeHarga = (e) => {
    let value = parseFloat(e.target.value);
    if (value < 0 || isNaN(value)) {
      value = 0;
    }
    setHarga(value);
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const calculateFinalPrice = () => {
    return harga * (beaMasuk / 100);
  }

  return (
    <div className="py-3">
      <div className="mb-5 flex gap-3 px-10">
        <Typography className="basis-1/4 !font-PT-Sans" >Harga :</Typography>
        <div className="basis-3/4 flex-grow relative">
          <Input 
            className="!pl-8" 
            type="number" 
            slotProps={{
              input: {
                min: 0
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChangeHarga}/>
            {isFocused && <div className="absolute left-2 top-[5px] text-black">Rp.</div>}
        </div>
      </div>

      <div  className="mb-5 flex gap-3 px-10">
        <Typography className="basis-1/4 !font-PT-Sans"  >Tarif Bea Masuk (%) :</Typography>
        <Input readOnly placeholder="Tarif Bea Masuk" className="cursor-not-allowed basis-3/4 !font-PT-Sans" value={beaMasuk} />
      </div>

      <div className="border-t-2  border-black pt-4 ">
        <div className="flex items-center justify-between px-10">
          <Typography variant="plain" className="!font-PT-Sans">Harga Final : </Typography>
          <Typography className="font-semibold !text-xl !font-PT-Sans">
            {
              calculateFinalPrice() === 0 ? '-' : `Rp.${calculateFinalPrice()},-`
            }
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default BeaMasuk
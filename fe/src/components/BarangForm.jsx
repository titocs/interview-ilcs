import { Input, Textarea, Typography } from "@mui/joy"
import { useState } from "react"
import { getBarang } from "../api/barang";
import { useKodeBarangStore } from "../stores/store";

const BarangForm = () => {
  const [rincianBarang, setRincianBarang] = useState('');
  const { kodeBarang } = useKodeBarangStore();
  
  const handleInputChange = async (e) => {
    kodeBarang(e.target.value)
    try {
      const data = await getBarang(e.target.value);
      const rincian = data.data.map((d) => {
        return d.sub_header + ' ' + d.uraian_id
      })
      setRincianBarang(rincian);
    } catch (error) {
      setRincianBarang('')
    }
  };

  return (
    <div className="py-3 flex gap-3 px-10">
      <Typography variant="plain" className="basis-1/4 !font-PT-Sans">Barang :</Typography>
      <div className="basis-3/4">
        <div className="mb-3">
          <Input fullWidth placeholder="Kode Barang" className="!font-PT-Sans"
            onChange={(e) => handleInputChange(e)} />
        </div>
        <Textarea className="!font-PT-Sans" minRows={3} placeholder="Rincian Barang" value={rincianBarang} readOnly/>
      </div>
    </div>
  )
}

export default BarangForm
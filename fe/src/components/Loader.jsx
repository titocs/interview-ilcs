import { LinearProgress, Typography } from '@mui/joy';

const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className='w-36'>
        <LinearProgress size='md' />  
        <Typography className="text-center pt-3">memuat . . .</Typography>
      </div>
    </div>
  );
};

export default Loader;

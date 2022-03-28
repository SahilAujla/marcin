import Button from '../src/components/Button'
import Loader from '../src/components/Loader'
import { useContext } from 'react';
import { MainContext } from '../context/mainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const { mintNFT, loading } = useContext(MainContext);

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl m-auto p-4 md:p-0 md:flex md:h-screen md:items-center md:justify-between ">
        {/* <div className="bg-red-500 max-w-4xl m-auto p-4"> */}



        <p className="w-[100rem]">
          <img className="w-[20%] md:w-[25rem] md:h-[25rem] mb-12" src="1.png"></img>
        </p>
        {/* <div className='flex flex-col items-start mx-12'> */}
        <div className='md:mx-12'>
          <p className='text-white text-4xl '>Join the revolution now! <br /> Mint your  <span className='text-[#10fcc7]'>bao-bao</span></p>

          <p className="mt-12 text-xl  text-white " >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>

          <div className='mb-2 w-72 '>
            {!loading ? <Button text="Mint" onClick={mintNFT} /> : <Loader />}
          </div>
        </div>
      </div>



    </>
  );
}

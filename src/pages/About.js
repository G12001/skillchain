import React from 'react';
import '../styles/about.css';
import { useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate();
  const home = () => {
    navigate('/skillchain');
  }
  return (
    <div className='about-con'>
      <p className='text-center text-xl font-bold pt-4'>Cert-Chain : A Blockchain Based Certificate Generation and Verification Decentralized Web Application</p>
      <p className='text-center'> Developed By :- </p>
      <div className='about-box flex'>
        <div className='text-center'>
            <div  className='proother transition duration-500 hover:scale-110' >  </div>
            <h3 className='mt-4 text-xl'>Aniket Kambale</h3>
        </div>
        <div className='text-center'>
          <div  className='pro ml-12 transition duration-500 hover:scale-110' >  </div>
          <div className='bio'>
            <h3 className='mt-4 text-xl' >Riteek R. Khaul</h3>
            <p>Email : riteekkhaul1610@gmail.com</p>
            <p>Contact : 9767735958</p>
            <button id='home-btn' className='px-4 py-2 text-white text-xl fw-bold rounded transform transition duration-500 hover:scale-110  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500' onClick={home}>Back To Home</button>
          </div>
        </div>
        <div className='text-center'>
          <div  className=' proother transition duration-500 hover:scale-110' >  </div>
            <h3 className='mt-4 text-xl'>Shubham Pimpale</h3>
        </div>
      </div>
    </div>
  )
}

export default About
import React from 'react';
import { Wrapper } from './styles';

const ipcRenderer = window.ipcRenderer;

const Home = () => {
   const toogleInfo = () => {
      console.log('s');
      ipcRenderer.send('info', 'my custom state');
   };

   return (
      <Wrapper>
         <button onClick={toogleInfo}>new window</button>
      </Wrapper>
   );
};
export default Home;

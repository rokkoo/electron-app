import React from 'react';
import { channels } from '../../shared/constants';
import { Wrapper } from './styles';

const { ipcRenderer } = window;

const Home = () => {
   const toogleInfo = () => {
      console.log('s');
      ipcRenderer.send(channels.APP_INFO, 'my custom state');
   };

   return (
      <Wrapper>
         <p>App</p>
         <button onClick={toogleInfo}>new window</button>
      </Wrapper>
   );
};
export default Home;

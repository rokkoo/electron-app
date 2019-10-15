import React from 'react';

import { useHistory } from 'react-router-dom';

// Channels
import { channels } from '../../shared/constants';

// Styles
import { Wrapper } from './styles';

// Inter process renderer
const { ipcRenderer } = window;

const Home = () => {
   const history = useHistory();

   const toogleInfo = () => {
      ipcRenderer.send(channels.APP_INFO, 'my custom args');
      history.push('/info');
   };

   return (
      <Wrapper>
         <p>App</p>
         <button onClick={toogleInfo}>new window</button>
      </Wrapper>
   );
};
export default Home;

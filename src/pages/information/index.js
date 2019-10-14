import React, { useState } from 'react';
import { channels } from '../../shared/constants';

import { Wrapper } from './styles';

const ipcRenderer = window.ipcRenderer;

const Information = () => {
   const [inf, setInfo] = useState('');

   ipcRenderer.on(channels.APP_INFO, (event, args) => setInfo(args));

   return (
      <Wrapper>
         {inf}
         <p>Information</p>
      </Wrapper>
   );
};
export default Information;

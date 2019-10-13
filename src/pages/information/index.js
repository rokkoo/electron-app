import React, { useState } from 'react';
import { Wrapper } from './styles';

const ipcRenderer = window.ipcRenderer;

const Information = () => {
   const [inf, setInfo] = useState('');

   ipcRenderer.on('info', (event, args) => setInfo(args));

   return (
      <Wrapper>
         {inf}
         <p>Information</p>
      </Wrapper>
   );
};
export default Information;

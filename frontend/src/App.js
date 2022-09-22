import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Main from './main';
import User from './userRoute/userHome';
import Login from './login';
import Providekey from './userRoute/nftPage/providekey';
import Myinfo from './userRoute/myinfoPage/myinfo';
import Community from './userRoute/communityPage/community';
import Useletter from './userRoute/useletterPage/useletter';
import NFTmoreInfo from './userRoute/nftPage/NFTmoreInfo';
import Donaterecord from './userRoute/communityPage/donaterecord';
import Writecontent from './userRoute/communityPage/writecontent';

import Krc from './krcRoute/krcHome';

import caver from './klaytn/caver'
import BlockNumber from './components/BlockNumber';
import Auth from './components/Auth';

function App() {  
  return (

  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<Login />} />
        <Route path='/providekey' element={<Providekey />} />
        <Route path='/myinfo' element={<Myinfo />} />
        <Route path='/community' element={<Community />} />
        <Route path='/useletter' element={<Useletter />} />
        <Route path='/bapp' element={<Auth />} />
        <Route path='/nftmoreInfo' element={<NFTmoreInfo />} />
        <Route path='/donaterecord' element={<Donaterecord />} />
        <Route path='/writecontent' element={<Writecontent />} />
        
        <Route path='/krc' element={<Krc />} />

    </Routes> 
    <div>
      <BlockNumber />
    </div>


  </BrowserRouter>

  );
}

export default App;
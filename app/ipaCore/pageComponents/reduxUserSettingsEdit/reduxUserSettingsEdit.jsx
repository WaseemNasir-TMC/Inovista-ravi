import React, { useState, useEffect } from 'react'

import UserCard from './components/UserCard'
import UserSettingsCard from './components/UserSettingsCard'

const reduxUserSettingsEdit = () => {

   return <div className='edit-page-body'>
      <UserCard />
      <UserSettingsCard />
   </div>

}

export default reduxUserSettingsEdit
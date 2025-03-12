import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setUserSettings } from '../../../redux/userSettingsSlice'

import './Card.scss'

const UserSettingsCard = () => {

   let settings = useSelector((state) => state.userSettings)
   const dispatch = useDispatch()

   const handleChange = (setting, value) => {

      let updatedSettings = structuredClone(settings)
      updatedSettings[setting] = value
      dispatch(setUserSettings(updatedSettings))

   }

   return <div className='info-card user-card'>
      {!settings && <div className='loading-user'>Loading User Settings...</div>}
      {settings && <div className='settings-info'>
         <table className='settings-info-table'>
            <tbody>
               <tr>
                  <td>Occupation</td>
                  <td><input type='text' onChange={(e) => handleChange('occupation', e.target.value)} value={settings.occupation}></input></td>
               </tr>
               <tr>
                  <td>Experience</td>
                  <td><input type='number' onChange={(e) => handleChange('experience', e.target.value)} value={settings.experience}></input></td>
               </tr>
               <tr>
                  <td>Title</td>
                  <td><input type='text' onChange={(e) => handleChange('title', e.target.value)} value={settings.title}></input></td>
               </tr>
            </tbody>
         </table>
      </div>}
      
   </div>

}

export default UserSettingsCard
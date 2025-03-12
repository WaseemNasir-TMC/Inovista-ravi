import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../../../redux/myUserSlice'

import './Card.scss'

const UserCard = ( ) => {

   let user = useSelector((state) => state.myUser.myUser)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getCurrentUser())
   }, [])

   return <div className='info-card user-card'>
      {!user && <div className='loading-user'>Loading User Info...</div>}
      {user && <div className='user-info'>
         <div className='firstname'><span className='info-label'>First Name:</span> {user._firstname}</div>
         <div className='lastname'><span className='info-label'>Last Name:</span> {user._lastname}</div>
         <div className='email'><span className='info-label'>Email:</span> {user._email}</div>
      </div>}
      
   </div>

}

export default UserCard
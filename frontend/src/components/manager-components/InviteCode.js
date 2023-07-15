import React, { useState } from 'react'
import { Button, Notification } from '@mantine/core'

function InviteCode( {inviteCode, setInviteCode} ) {

  
  
  const [notify, setNotify] = useState(false);


  const handleInviteCodeClick = () => {
    navigator.clipboard.writeText(inviteCode);
    setNotify(true);
  }

  const handleRefreshInviteCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8); //do this in backend later
    setInviteCode(randomCode);
  }

  return(
    <div className='w-1/2 p-4 flex flex-col items-center  bg-slate-50  rounded '>
  <p className='p-2 text-xl'>Your invite code: <b className='hover:text-blue-700 hover:bg-blue-100 hover:cursor-pointer' onClick={handleInviteCodeClick}>{inviteCode}</b></p>
  {
    notify && <Notification
      title="Copied to clipboard"
      color="teal"
      shadow="md"
      className="mb-4"
      onClose={() => setNotify(false)}
    />
  }
  <button className='bg-slate-300 w-1/4 rounded shadow-sm hover:bg-red-200' onClick={handleRefreshInviteCode}>Refresh?</button>
  </div>
  );


}
export default InviteCode
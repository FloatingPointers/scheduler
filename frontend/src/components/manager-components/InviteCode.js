import React, { useEffect, useState } from 'react'
import { Button, Notification } from '@mantine/core'
import axiosInstance from '../../Axios';


function InviteCode( ) {

  
  
  const [notify, setNotify] = useState(false);
  const [inviteCode, setInviteCode] = useState("111111");


  const handleInviteCodeClick = () => {
    navigator.clipboard.writeText(inviteCode);
    setNotify(true);
  }

  const handleRefreshInviteCode = () => {

    axiosInstance.get('/invite/store/new-invite-code').then((res) => {
      setInviteCode(res.data.inviteCode);
    })
  }

  useEffect(() => {
    axiosInstance.get('/invite/store/invite-code').then((res) => {
      setInviteCode(res.data.inviteCode);
    })
  }, [])

  return(
    <div className='w-full flex flex-col items-center justify-center gap-2'>
  <p className='text-xl'>Your invite code: <b className='hover:text-blue-700 hover:bg-blue-100 hover:cursor-pointer' onClick={handleInviteCodeClick}>{inviteCode}</b></p>
  {
    notify && <Notification
      title="Copied to clipboard"
      color="teal"
      shadow="md"
      className="mb-4"
      onClose={() => setNotify(false)}
    />
  }
  <button className='bg-slate-300 px-3 py-1 rounded shadow-sm hover:bg-red-200' onClick={handleRefreshInviteCode}>New Code</button>
  </div>
  );


}
export default InviteCode
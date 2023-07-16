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
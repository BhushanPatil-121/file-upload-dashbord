'use client';
import React from 'react'

import { SessionProvider } from 'react';


const  = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionProvider
'use client';
import React from 'react'

import { SessionProvider } from 'react';


const Provider = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionProvider
'use client';
import React from 'react'

import { SessionProvider } from 'next-auth/react';


const Provider = ({children}) => {
  return (
    <AuthSessionProvider>{children}</AuthSessionProvider>
  )
}

export default SessionProvider
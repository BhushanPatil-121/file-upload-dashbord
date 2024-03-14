'use client';
import React from 'react'

import { SessionProvider as AuthSessionProvider } from 'next-auth/react';


const Provi = ({children}) => {
  return (
    <AuthSessionProvider>{children}</AuthSessionProvider>
  )
}

export default SessionProvider
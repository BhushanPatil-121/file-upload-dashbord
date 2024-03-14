'use client';
import React from 'react'

import { SessionProvider } from 'react';


const Provider = ({children}) => {
  return (
    <AuthSessionProvider>{children}</AuthSessionProvider>
  )
}

export default SessionProvider
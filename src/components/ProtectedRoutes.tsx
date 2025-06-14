import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

interface ProtectedRoutesProps {
    currentUser: string
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ currentUser }) => {
    return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes

import { Outlet, Navigate } from 'react-router-dom'

interface PrivateRoutesProps {
    currentUser: string | null
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ currentUser }) => {
    return !currentUser ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateRoutes

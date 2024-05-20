import { Navigate, Outlet } from 'react-router-dom'

const HeaderAuthentication = () => {
    const headerLinks = localStorage.getItem("user")
    return headerLinks ? <Outlet /> : <Navigate to="/" />
}

export default HeaderAuthentication
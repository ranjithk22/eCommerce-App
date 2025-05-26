import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="text-center pt-5">
            <div className="text-3xl">404</div>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default NotFound
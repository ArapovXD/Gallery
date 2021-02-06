import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import {useAuth} from '../hooks/AuthContext';
import ExitIcon from '@material-ui/icons/ExitToApp';

export default function Navbar() {

    const {currentUser, logout} = useAuth();
    const history = useHistory()
    const linkStyle = {
        color: 'white'
    }

    function handleLogout(){
        logout()
        history.push('/');
        window.location.reload()
    }

    return (
        <div>
            <ul className="Nav">
                {currentUser && <li><MuiLink underline="none" className="navItem" component={Link} style={linkStyle} to={`/profile/${currentUser.handle}`}>{currentUser.handle} </MuiLink></li>}
                <li><Link className="navItem" style={linkStyle} to="/">Main </Link></li>
                {currentUser && <li style={{float: 'right'}}> <Link className="navItem" onClick={handleLogout}>Log Out</Link></li>}
            </ul>
        </div>
    )
}

import {Link} from 'react-router-dom'
import Logo from '../bankLogo/SuwaArana_Logo.jpg'

const Navbar=()=>{
    return(
        <header>
            <div className="container">
                <img src={Logo} alt='logo'></img>
                <Link to="/">
                    <h1>Suwa Arana Ayurvedic Center</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar
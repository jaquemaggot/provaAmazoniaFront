import { Link } from "react-router-dom"
import Container from "./Container"

import styles from './Navbar.module.css'
import logo from '../../img/logo.png'
function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to='/'>
                    <img src={logo} alt="amazonia"/>
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item} >
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/users">Usuários</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/newuser">Novo usuário</Link> 
                    </li>
                </ul>
            </Container>
        </nav>
    )
}
export default Navbar
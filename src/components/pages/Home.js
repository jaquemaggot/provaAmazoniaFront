import React from "react"

import styles  from './Home.module.css'
import savings from '../../img/inicio.png'
import LinkButton from "../layout/LinkButton"

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Amazônia Chat</span></h1>
            <p>Comece agora mesmo uma conversa com um de nossos especialistas, crie sua conta!</p>
            <LinkButton to="/newuser" text="Criar usuário"/>
            <img src={savings} alt="Costs"/>
        </section>
    )
}

export default Home
import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'


import { Link } from 'react-router-dom'

import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import styles from './Users.module.css'

function Users() {

    const [users, setUsers] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [userMessage, setUserMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://127.0.0.1:8000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setUsers(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 300)
    }, [])

    function removeUser(id) {
        fetch(`http://127.0.0.1:8000/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then(() => {
                setUsers(users.filter((user) => user.id !== id))
                setUserMessage('Usuário removido com sucesso!')
            }).catch((err) => { setUserMessage(err) })
    }

    return (
        <div >
            <div className={styles.title_container}>
                <h1>Usuários</h1>
                <LinkButton to="/newuser" text="Criar usuário" />
            </div>
            {message && <Message type="success" msg={message} />}
            {userMessage && <Message type="success" msg={userMessage} />}
            <Container customClass="start">
                {users.length > 0 && (
                    <table className={styles.custom_table}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className={styles.table_action} to={`/user/${user.id}`}>
                                            <span className="table_action-icon"><BsPencil /></span>
                                            <span className="table_action-text">Editar</span>
                                        </Link>
                                        <button className={styles.table_action} onClick={() => removeUser(user.id)}>
                                            <span className="table_action-icon"><BsFillTrashFill /></span>
                                            <span className="table_action-text">Excluir</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!removeLoading && <Loading />}
                {removeLoading && users.length === 0 && (
                    <p>Não há usuários cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Users
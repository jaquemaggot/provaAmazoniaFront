import { useEffect, useState } from 'react'
import styles from './User.module.css'

import { useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import UserForm from '../user/UserForm'
import Message from '../layout/Message'

function User() {
    const { id } = useParams()

    const [user, setUser] = useState([])
    const [showUserForm, setShowUserForm] = useState(false)

    const [message, setMessage] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setUser(data)
            })
            .catch(err => console.log)
    }, [id])

    function editPost(user) {
        fetch(`http://127.0.0.1:8000/api/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw resp;
                }
            })
            .then((data) => {
                setUser(data);
                setShowUserForm(false);
                setMessage('Projeto atualizado');
                setType('success');
            })
            .catch((err) => {
                err.json().then((errorData) => {
                    const errorMessage = errorData.message;
                    setMessage(errorMessage);
                    setType('error');
                });
            });
    }

    function toggleUserForm() {
        setShowUserForm(!showUserForm)
    }
    return (
        <>
            {
                user.name ? (
                    <div className={styles.user_details}>
                        <Container customClass="column">
                            {message && <Message type={type} msg={message} />}
                            <div className={styles.details_container}>
                                <h2>Nome: {user.name}</h2>
                                <button className={styles.btn} onClick={toggleUserForm}>
                                    {!showUserForm ? 'Editar Usuário' : 'Fechar'}
                                </button>
                                {!showUserForm ? (
                                    <div className={styles.user_info}>
                                        <p>
                                            <span>Cpf:</span> {user.cpf}
                                        </p>
                                        <p>
                                            <span>Data de nascimento:</span> {user.birthdate}
                                        </p>
                                        <p>
                                            <span>Email:</span> {user.email}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={styles.user_info}>
                                        <UserForm handleSubmit={editPost} btnText="Concluir edição" userData={user} />
                                    </div>
                                )}
                            </div>
                        </Container>
                    </div>
                ) : (
                    <Loading />
                )
            }
        </>
    )
}

export default User
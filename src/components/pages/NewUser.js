import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import React from "react";
import styles from './NewUser.module.css';
import UserForm from "../user/UserForm";
import Message from '../layout/Message';

function NewUser() {
    const navigate = useNavigate();

    const [message, setMessage] = useState();
    const [type, setType] = useState();

    function createPost(usuario) {
        fetch('http://127.0.0.1:8000/api/user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(usuario),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return resp.json().then((errorData) => {
                        throw new Error(errorData.message);
                    });
                }
            })
            .then((data) => {
                navigate('/users', { state: { message: 'Usuário criado com sucesso!' } });
            })
            .catch((err) => {
                setMessage(err.message);
                setType('error');
            });
    }

    useEffect(() => {
        if (navigate.state && navigate.state.message) {
            setMessage(navigate.state.message);
            setType('success');
        }
    }, [navigate.state]);

    return (
        <div className={styles.newuser_container}>
            {message && <Message type={type} msg={message} />}
            <h1>Criar usuário</h1>

            <UserForm handleSubmit={createPost} btnText="Criar usuário" />
        </div>
    );
}

export default NewUser;


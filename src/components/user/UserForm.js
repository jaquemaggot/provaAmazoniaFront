import { useEffect, useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from './UserForm.module.css'

function UserForm({ handleSubmit, btnText, userData }) {
    const [user, setUser] = useState(userData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(user)
    }

    function handleChange(e) {
        const { name, value } = e.target

        if (name === "cpf" || name === "zip_code") {
            const numericValue = value.replace(/\D/g, "") 
            setUser({ ...user, [name]: numericValue })
        } else {
            setUser({ ...user, [name]: value })
        }
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome"
                name="name"
                placeholder="Insira o nome:"
                handleOnChange={handleChange}
                value={user.name ? user.name : ''}
            />
            <Input
                type="text"
                text="Email"
                name="email"
                placeholder="Insira o e-mail:"
                handleOnChange={handleChange}
                value={user.email ? user.email : ''}
            />
            <Input
                type="text"
                text="Cpf"
                name="cpf"
                placeholder="Insira o cpf:"
                handleOnChange={handleChange}
                value={user.cpf ? user.cpf : ''}
            />
            <Input
                type="date"
                text="Data de Nascimento"
                name="birthdate"
                placeholder="Insira a data de nascimento:"
                handleOnChange={handleChange}
                value={user.birthdate ? user.birthdate : ''}
            />
            <Input
                type="text"
                text="Cep"
                name="zip_code"
                placeholder="Insira o CEP:"
                handleOnChange={handleChange}
                value={user.zip_code ? user.zip_code : ''}
            />
            <Input
                type="number"
                text="Número"
                name="number"
                placeholder="Insira o número:"
                handleOnChange={handleChange}
                value={user.number ? user.number : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default UserForm

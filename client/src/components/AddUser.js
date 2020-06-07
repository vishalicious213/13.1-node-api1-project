import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AddUser = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const updateUserName = event => {
        setUserName(event.target.value);
    }

    const updateUserEmail = event => {
        setUserEmail(event.target.value);
    }

    const submitUser = event => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/api/users', { name: userName, email: userEmail })
            .then(results => {
                // console.log('Add User: ', results);
                props.history.push('/userslist');
            })
            .catch(error => {
                console.log('Login error: ', error);
            })
    }

    return (
        <Section className='add-user'>
            <h1 className='title'>Contrieved UserList</h1>
            <form className='add-user-form' onSubmit={submitUser}>
                <h4 className='add-user-text add-user-heading'>Add New User</h4>
                <input className='login-input' type='text' name='userName' placeholder="User's Name" value={userName} onChange={updateUserName} />
                <input className='login-input' type='text' name='userEmail' placeholder="User's Email" value={userEmail} onChange={updateUserEmail} />
                <button className='login-input' >Add User</button>
            </form>
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        width: 46%;
        border: 1px solid gainsboro;
        border-radius: 1rem;
        margin-left: 1rem;
        color: whitesmoke;
        text-align: center;
    }

    .add-user-form {
        width: 46%;
        margin-top: 0;
    }

    .add-user-heading {
        color: whitesmoke;
        padding-left: .15rem;
        margin-bottom: 0;
        margin-top: 0;
    }
`
export default AddUser;
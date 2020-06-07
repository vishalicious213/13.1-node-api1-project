import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ShowUsers = () => {
    const [users, setUsers] = useState();

    const getUsers = () => {
        axios
            .get('http://localhost:3001/users')
            .then(response => {
                // console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.log("Error retrieving data: ", error);
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Section>
            {(users ?
                users.map(user => (
                    <div className='user' key={user.id}>
                        <div className='info-container'>
                            <h4>{user.name}</h4>
                            <p>{user.bio}</p>
                        </div>
                        <div className='button-container'>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                )) : null)}
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin: 1rem;
    // background: lightslategray;

    .user {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid gainsboro;
        border-radius: 1rem;
        background: lightslategray;
        padding: .5rem;
        margin: .5rem;
        width: 28%;
        min-width: 110px;
    }

    .user:hover {
        border: 1px solid white;

        p {
            color: whitesmoke;
        }
    }

    h4 {
        margin: 0;
        margin-bottom: .25rem;
        color: white;
    }

    p {
        margin: 0;
        color: gainsboro;
    }

    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        margin-right: .5rem;
        margin-left: .5rem;
    }

    button {
        font-size: .75rem;
        width: 4rem;
    }
`
export default ShowUsers;
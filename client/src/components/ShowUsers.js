import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowUsers = () => {
    const [users, setUsers] = useState();

    const getUsers = () => {
        axios
            .get('http://localhost:3001/users')
            .then(response => {
                console.log(response.data);
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
        <section>
            {(users ?
                users.map(user => (
                    <div key={user.id}>
                        <h4>{user.name}</h4>
                        <p>{user.bio}</p>
                    </div>
                )) : null)}
        </section>
    )
}

export default ShowUsers;
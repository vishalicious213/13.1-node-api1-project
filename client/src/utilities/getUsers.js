import axios from 'axios';

const getUsers = (setUsers) => {
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

export default getUsers;
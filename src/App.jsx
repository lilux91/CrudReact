
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
//import Header from'./components/Header'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const baseURL = "http://144.126.218.162:9000";

function App() {
  const [users, setUsers] = useState();

  //esto para pasar info desde UseCard hasta FormUser
  const [updateInfo, setUpdateInfo] = useState();
  //console.log(updateInfo)
  //Esto es para cerrar el modal
  const [formIsClose, setFormIsClose] = useState(true);

  //Para hacer el get de todos los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users`;
    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //Para crear un nuevo usuario
  const createNewUSer = (data) => {
    const URL = `${baseURL}/users/`;
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  //Para eliminar un usuario especifico
  const deleteUserById = (id) => {
    const URL = `${baseURL}/users/${id}`;
    axios
      .delete(URL)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };

  //Para actualizar un usuario en especifico
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`;

    axios
      .patch(URL, data)
      .then((res) => {
        console.log(res.data);
        getAllUsers();
      })
      .catch((err) => console.log(err));
  };
  const handleOpenForm = () => {
    setFormIsClose(false);
  };

  return (
    <div className="App">
      <div className="App_container-title">
        <h1 className="App_title">Users CRUD</h1>
        <button onClick={handleOpenForm} className="App_btn">
          Create a New User
        </button>
      </div>
      <div className={`form-container ${formIsClose && "disable_form"}`}>
        <FormUsers
          createNewUSer={createNewUSer}
          updateInfo={updateInfo}
          updateUserById={updateUserById}
          setUpdateInfo={setUpdateInfo}
          setFormIsClose={setFormIsClose}
        />
      </div>
      <div className="users-container">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            deleteUserByID={deleteUserById}
            setUpdateInfo={setUpdateInfo}
            setFormIsClose={setFormIsClose}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

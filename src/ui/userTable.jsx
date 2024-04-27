import {useEffect, useState} from "react";
import Button from "../customInt/Button.jsx";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function UserTable(){
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [tableUsers, setTableUsers] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const navigateTo = useNavigate();
    const token = localStorage.getItem('token');
    const handleAdminRequest = () => {
        axios.get(`https://testserver-o5a7.onrender.com/admin`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(r=> {
                setTableUsers(r.data)

            })
            .catch(e=>console.error(e))
    }

    useEffect(() => {
        axios.get(`https://testserver-o5a7.onrender.com/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCurrentUser(response.data);
                if (currentUser.status === 'blocked') {
                    navigateTo('/autorization');
                } else {
                    handleAdminRequest();
                }
            })
            .catch(error => {
                console.error('Ошибка при получении данных о текущем пользователе:', error);
            });
        handleAdminRequest();
    }, []);
    const handleCheckboxChange = (id) => {
        setSelectedRows((prevState) =>
            prevState.includes(id)
                ? prevState.filter((rowId) => rowId !== id)
                : [...prevState, id]
        );
    };

    const handleSelectAllChange = () => {
        if (selectedRows.length === tableUsers.length) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            const allIds = tableUsers.map((row) => row.id);
            setSelectedRows(allIds);
            setSelectAll(true);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigateTo('/autorization');
    };
    function statusChecked(e){
        if (e.response.status === 403 || e.response.status===401){
            localStorage.removeItem('token')
            navigateTo('/autorization')
        }
    }
    async function putBlocked(){
            console.log(`selected rowes`, selectedRows)
            const data = { selectedRows };
            axios.put(`https://testserver-o5a7.onrender.com/admin/block`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(r=>{
                    handleAdminRequest()
                })
                .catch(e=>{
                    statusChecked(e)
                })

    }
    const handleBlocked = () =>{

        putBlocked()
            .then(()=>{
                if (selectedRows.includes(currentUser.id)){
                    localStorage.removeItem('token')
                    navigateTo('/autorization')
                }
            })
            .catch(e=>console.error(e))
        setSelectedRows([])
        setSelectAll(false)
    }
    const handleUnblocked = () =>{
        selectedRows.forEach(id=>{
            axios.put(`https://testserver-o5a7.onrender.com/users/unblock/:${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(r=>{
                    handleAdminRequest()
                    })
                .catch(e=> {
                    statusChecked(e)
                })
        })
        setSelectedRows([])
        setSelectAll(false)
    }
    const handleDelete = () =>{
        selectedRows.forEach(id=>{
            axios.delete(`https://testserver-o5a7.onrender.com/users/:${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(r => handleAdminRequest())
                .catch(e => {
                    statusChecked(e)
                })
        })
        setSelectedRows([])
        setSelectAll(false)
    }

    const tableData = [
        { id: 1, col1: 'Текст 1', col2: 'Текст 2', col3: 'Текст 3', col4: 'Текст 4', col5: 'Текст 5', col6: 'Текст 6' },
    ];

    return (
        <div className="form-control mx-auto position-relative" style={{ width: '1200px', marginTop: '200px' }}>
            <Button
                additionalClasses="position-absolute end-0 me-3"
                onClick={handleLogout}
            >Выйти</Button>
            <div className="d-flex py-3 gap-4 justify-content-center align-items-center">
                <span onClick={handleBlocked} className="material-symbols-outlined pointer">
                lock
                </span>
                <span onClick={handleUnblocked} className="material-symbols-outlined pointer">
                lock_open
                </span>
                <span onClick={handleDelete} className="material-symbols-outlined pointer">
                delete
                </span>
            </div>

            <table className="my-5 table table-striped table-bordered mx-auto">
                <thead>
                <tr>
                    <th scope="col">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                    </th> {}
                    <th scope="col">id</th>
                    <th scope="col">email</th>
                    <th scope="col">name</th>
                    <th scope="col">registered</th>
                    <th scope="col">authorized</th>
                    <th scope="col">status</th>
                </tr>
                </thead>
                <tbody>
                {(tableUsers?tableUsers:tableData).map((row) => (
                    <tr key={row.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => handleCheckboxChange(row.id)}
                            />
                        </td>
                        <td>{row.id}</td>
                        <td>{row.email}</td>
                        <td>{row.name}</td>
                        <td>{row.registrationDate}</td>
                        <td>{row.lastLoginDate}</td>
                        <td>{row.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );


}
export default UserTable

import Input from "../customInt/Input.jsx";
import Button from "../customInt/Button.jsx";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
function Registration(){
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const[successR,setSuccessR] = useState('')
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', {
                email: email,
                name: name,
                password: password,
                status: 'active'
            });

            localStorage.setItem('token', response.data.token);

            setSuccessR('Вы успешно зарегистрировались');

            setRedirectToLogin(true);
        } catch (error) {
            // Если произошла ошибка, обрабатываем её
            if (error.response && error.response.status === 409) {
                setErrorMessage('Пользователь уже зарегистрирован.');
            } else {
                setErrorMessage('Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.');
            }
        }
    };
    return(
        <>
            {redirectToLogin && <Navigate to="/user-table" />}
            <h1 className="text-center my-5">Регистрация</h1>
            <div className="container d-flex  justify-content-center">
                <form className="d-flex flex-column ">
                    <Input
                        onChange={e=>setEmail(e.target.value)}
                        inputType="email"
                        placeholder="Введите email"
                        value={email}
                    />
                    <Input
                        onChange={e=>setName(e.target.value)}
                        inputType="email"
                        placeholder="Введите имя"
                        value={name}
                        />
                    <Input
                        onChange={e=>setPassword(e.target.value)}
                        value={password}
                        inputType="password"
                        placeholder="Введите пароль" />
                    <Button
                    onClick={handleLogin}
                    >Зарегистрироваться</Button>
                    {errorMessage && <p className="text-danger text-center mt-2">{errorMessage}</p>}
                    {successR && <p className="text-success text-center mt-2">{successR}</p>}
                    <p className="text-center"><Link to="/autorization">Войти</Link></p>
                </form>
            </div>
        </>
    )
}
export default Registration
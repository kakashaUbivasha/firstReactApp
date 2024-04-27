import Input from "../customInt/Input.jsx";
import Button from "../customInt/Button.jsx";
import {Link, Navigate} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
function Autorization(){
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [errorMessage, setErrorLogin] = useState('')
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = (event) => {
        event.preventDefault();
        let userData = {
            email: email,
            password: password,
            status: 'active'
        };
        console.log(userData);
        axios.post('https://testserver-o5a7.onrender.com/login',userData)
            .then((response)=>{
                console.log(response)
                localStorage.setItem('token', response.data.token);
                setRedirectToLogin(true)
            }
            )
            .catch(e=>{
                if(e.response&&e.response.status === 401){
                    setErrorLogin('Неверная почта или пароль павторите попытку')
                }
                else if(e.response&&e.response.status === 403){
                    setErrorLogin('Аккаунт заблокирован')
                }
                else{
                    setErrorLogin('Упс, что-то пошло не так, повторите попытку позже')
                }
            })
    };
    return(
            <>
            {redirectToLogin && <Navigate to="/user-table" />}
        <h1 className="text-center my-5">Авторизация</h1>
        <div className="container d-flex  justify-content-center">
        <form className="d-flex flex-column justify-content-center text-center align-items-center">
            <Input
                inputType="email"
                placeholder="Введите email"
                value={email}
                onChange={handleEmailChange}
            />
            <Input
                inputType="password"
                placeholder="Введите пароль"
                value={password}
                onChange={handlePasswordChange}
            />
            <Button
                onClick={handleLogin}
            >Войти</Button>
            {errorMessage && <h5 className="text-danger fw-bold text-center mt-4">{errorMessage}</h5>}
            <h4><Link to="/registration">Перейти в окно регистрации </Link></h4>
        </form>
        </div>
</>
    )
}
export default Autorization
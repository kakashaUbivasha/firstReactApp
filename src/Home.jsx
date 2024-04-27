import Button from "./customInt/Button.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigateTo = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="m-auto d-flex flex-column border border-1 border-primary p-5 rounded" style={{ width: '400px' }}>
                <Button
                    onClick={() => navigateTo('/autorization')}
                    additionalClasses="m-auto"
                >
                    Авторизоваться
                </Button>
                <Button
                    onClick={() => navigateTo('/registration')}
                    additionalClasses="mt-5"
                >
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    );
}

export default Home;

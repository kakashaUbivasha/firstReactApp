import MainRouter from "./router/router.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div className="mx-auto" style={{width: '1200px'}}>
        <BrowserRouter>
            <MainRouter/>
        </BrowserRouter>
    </div>
  )
}

export default App

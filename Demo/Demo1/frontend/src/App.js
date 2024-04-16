import './App.css';
import Button from "./components/common/Button/Button";
import { BsPrinter } from "react-icons/bs";

function App() {
    return (
        <>
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button text={'Print'}
                        startIcon={<BsPrinter/>}
                        sx={{
                            backgroundColor: '#090E24',
                            color: 'white',
                            padding: '25px 40px',
                            borderRadius: '20px',
                            fontSize: '18px'
                        }}
                        href={'http://localhost:5000/generatePDF'}
                        target='_blank'
                />
            </div>
        </>
    );
}

export default App;
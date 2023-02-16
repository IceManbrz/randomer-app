import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Randomer from './routes/Randomer';
import NotFound from './routes/NotFound';
const App = () => {
  return (
    <>
      <div className='navbar'>
        <div className=''>
           
        <h2 >Spinner</h2>
          <p >Event</p>
          
        </div>
        <Link to='/randomer'>Randomer</Link>
      </div>

      <Routes>
        <Route path="/randomer">
          <Route index element={<Randomer />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {//<Photos excelData={App} filename={"result"}/>
      }

    </>
  );
};

export default App;

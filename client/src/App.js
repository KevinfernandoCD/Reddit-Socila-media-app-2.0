
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PostForm from './components/PostForm';




function App() {

  return (

  <div className="App">
    <Routes>
      <Route exact path='/home' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/submit' element={<PostForm/>}/>
    </Routes>

 </div>

  );
}

export default App;

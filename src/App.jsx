
import './App.css'
import Sidenav from './component/Sidenav'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Videos from './pages/Videos'
import Categories from './pages/Categories'
import HeaderAuthentication from './Auth/HeaderAuthentication'
import Login from './component/Login';
function App() {


  return (
    <>
<BrowserRouter>

<Routes>
<Route element={<HeaderAuthentication />}>
          
  <Route path='/dashboard' exact element ={<Sidenav></Sidenav>}></Route>
         
  <Route path='/home'exact element={<Home></Home>}></Route>
  <Route path='/videos' exact element={<Videos></Videos>}></Route>
  <Route path='/categories' exact element={<Categories></Categories>}></Route>
           
          </Route>
          <Route path='/' exact element={<Login></Login>}></Route>    
</Routes>
</BrowserRouter>
    </>
  )
}

export default App

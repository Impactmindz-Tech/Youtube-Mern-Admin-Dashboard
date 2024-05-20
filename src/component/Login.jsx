import {useState,useEffect} from 'react'
import {useNavigate } from "react-router-dom"
import axios from 'axios';

const Login = () => {
    


  const navigate = useNavigate();
 const[token,setToken] = useState(null);
  const[data,setdata] = useState({});

   const handlechange = (e)=>{
    const{name,value} = e.target;
setdata((prev)=>{
    return {...prev,[name]:value}
})

   }
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const  handlesubmit=async(e)=>{
        e.preventDefault();
    
        try{
            let datafetch =  await axios.post("https://mern-backend-eosin.vercel.app/user/login",data);
           let response = datafetch.data;
           if(response.success){
            console.log(response.token);
           
            localStorage.setItem('uid',response.id);
            setToken(response.token);
            localStorage.setItem('token',response.token||null);
    
           
           
            localStorage.setItem('user',JSON.stringify(response.check));


     
            navigate('/dashboard');
           localStorage.setItem('name',response.check.Name);
           localStorage.setItem('email',response.check.Email);
           localStorage.setItem('id',response.check._id);
          
           }
        }catch(error){
            console.log("something went wrong");
        }

   }
   useEffect(() => {
    const headerLinks = localStorage.getItem("user")
    if (headerLinks) {
      navigate("/");
      

    }
  },[]);


  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6 login_box">
              <h2 className='text-center'>Login</h2>
            <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='Email' id="exampleInputEmail1" onChange={handlechange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Well never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='Password' id="exampleInputPassword1" onChange={handlechange}/>
  </div>

 <div className='text-center'>
 <button type="submit " className="btn btn-primary" onClick={handlesubmit}>Login</button>
 </div>
</form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login

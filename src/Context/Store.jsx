import { createContext ,useState,useEffect} from "react";
export const ProductContext = createContext(null);
import axios from "axios";



const ProductContextProvider=(props)=>{
    const[getproduct,setProduct] = useState([]);
    const[getCate,setCate] = useState([]);
    const[user,setuser] = useState();
    const[uid,setuid] = useState(null);

const getAllProduct = async()=>{
    try{
        let response = await axios.get("https://mern-backend-eosin.vercel.app/product/");
        let result = response.data;
       setProduct(result);
     
   
     

    }catch(error){
        console.log(error)


    }

}

const getSortProduct = async(value)=>{
    try{
        let response = await axios.get(`https://mern-backend-eosin.vercel.app/sorting?sort=${value}`);
        // setProduct(response.data);
    
    }
    catch(error){
        console.log(error);
    }
}
const getAllcategory = async()=>{
    try{

      let response = await axios.get("https://mern-backend-eosin.vercel.app/category");
      setCate(response.data.categoryname.DroneVideos);
       console.log(response.data.categoryname.DroneVideos);

    }catch(error){
        console.log(error);
    }
}
useEffect(()=>{
    getAllProduct();
    getAllcategory();
    getSortProduct();
},[])
   const Contextvalue = {getproduct,getAllProduct ,getCate,getAllcategory,user,setuser,setProduct,getSortProduct , uid,setuid};
     return(
        <ProductContext.Provider value = {Contextvalue}>
            {props.children}
        </ProductContext.Provider>
     )
}

export default ProductContextProvider;
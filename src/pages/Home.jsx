import { useContext,useState } from 'react';
import Sidenav from '../component/Sidenav'
import Box from '@mui/material/Box';
import {ProductContext} from '../Context/Store';
const Home = () => {
const {getCate,getproduct} = useContext(ProductContext);
const[showcat,setcat] = useState(false);
const [showvid,setvid] = useState(false);
  
  return (
   <>
     <Box  sx={{ display:'flex' }}>
     <Sidenav></Sidenav>
 
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <section className='mt-5 pt-5'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
           <div className="card custom_card">
            <div className="card-title  text-center">
              <h2>Category</h2>
              <p></p>
            </div>
            <div className="card-body">
              <p>This is a card body here  is the description about the card</p>            
              <p><button className='view_buttons' onClick={()=>setcat(!showcat)}>view category</button></p>
              </div>
           </div>
          </div>
          <div className="col-lg-4">
            <div className="card h-100 custom_card">
              <div className="card-title text-center">
                <h2>Videos</h2>
              </div>
              <div className="card-body">
                <p>this is a card body here is the description about the  Video</p>
                <p><button className='view_buttons' onClick={()=>setvid(!showvid)}>view videos</button></p>
              </div>
            </div>
          </div>
          <div className="col-lg-4"> 
          <div className="card h-100 custom_card">
              <div className="card-title text-center">
                <h2>Setting</h2>
              </div>
              <div className="card-body">
                <p>all settings</p>
                <p><button className='view_buttons'>view Setting</button></p>
              </div>
            </div>
            </div>

{/* Showdata */}


          {showcat?( 
             <div className="col-lg-4">
              <div className="category_card mt-3">
                <h2 className='text-center'><b>Category</b></h2>
                <table className='category_table'>
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Category Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCate.map((item)=>{
                      return(
                       <>
                      <tr>
                        <td>{item.cat_name}</td>  
                        <td>{item.cat_desc}</td>
                        </tr> 
                       
                       </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>):(<div className='col-lg-4'></div>)}



          {/* showvideos */}

{showvid?(          <div className="col-lg-4">
              <div className="category_card mt-3">
                <h2 className='text-center'><b>Videos</b></h2>
                <table className='category_table'>
                  <thead>
                    <tr>
                      <th>Video Name</th>
                      <th>Video Url</th>
                      <th>Video Description</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  {getproduct.map((items) => {
  return items.data.map((info) => {
    return (
      <>
      <tr key={info._id}>
          
        
          <td>{info.p_name}</td>
          <td>{info.url}</td>
          <td>{info.p_desc}</td>

        
        </tr>
   </>
    );
  });
})}
                  </tbody>
                </table>
              </div>
            </div>):(<div className='col-lg-4'></div>)}
        </div>
      </div>
    </section>

    
      </Box>
      </Box>

   </>
  )
}

export default Home

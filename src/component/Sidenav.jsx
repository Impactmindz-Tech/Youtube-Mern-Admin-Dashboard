import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenav() {
  const[data,setdata] = useState({
    old_password:'',
    new_password:''
  });
 
  let userid = localStorage.getItem('id');
  const Navigate = useNavigate();
  let user = localStorage.getItem('name');
  let email  = localStorage.getItem('email');
  const theme = useTheme();
  const[show,setshow] = useState(false);

  const [open, setOpen] = React.useState(false);
const handlelogout =()=>{
 let user = localStorage.getItem('user');
  try{
    if(user){
       localStorage.removeItem('user');
       Navigate('/');
    }
  }catch(error){
    console.log(error);
  }
}

const changepassword = (e)=>{
  const{name,value}  =e.target;
  setdata((prev)=>{
    return {...prev,[name]:value}
  })

}
const updatepass = async(e)=>{
  e.preventDefault();
  try{
       let updatepass = await axios.post(`https://mern-backend-eosin.vercel.app/user/update/${userid}`,data);
       console.log(updatepass);
       console.log(userid);
  }catch(error){
   console.log(error);
  }
}
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(!open)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Logo
          </Typography>
           <div className="profile ms-4 mt-2 pt-1"><h5 className='profile' onClick={()=>setshow(!show)}>Profile {user}</h5></div>     

          <div className='ms-auto'  onClick={handlelogout}><button className='logout'>Logout</button></div>
          
     
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        
        <IconButton onClick={()=>setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>Navigate('/home')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardIcon  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>Navigate('/categories')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Category" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=>Navigate('/videos')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PlayCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Product" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
         </Drawer>
       {show?(<div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-6 main_profile_Card">
              <div className="profile_card">
                <h2 className='text-center'>User Info</h2>
                <hr />
                 <div className="row">
                  <div className="col-lg-6">
                   <p className='mb-1'>Username:</p>
                   <p className='username mb-1'>{user}</p>
                    <p className='mb-1'>your email:</p>
                    <p className='username'>{email}</p>
                  </div>
                  <div className="col-lg-6">
                   <p className='mb-1' >Old password:</p>
                 <form>
                 <input type="text" className='p-1 w-100'  onChange={changepassword} name='old_password'/>
                   <p className='mb-1 mt-2' >New password:</p>
                   <input type="text" className='p-1 w-100' onChange={changepassword} name ="new_password"/>
                   </form> 
                  </div>
                 </div>
          <div className="submit_button">
            <button className='update_button' onClick={updatepass}>Update User</button>
          </div>
              </div>
          </div>
        </div>
       </div>):''}



    </Box>
  );
}

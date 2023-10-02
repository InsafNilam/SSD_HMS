import React ,{useState} from 'react'
import {DefaultMenuItems,DoctorMenuItems,AdminMenuItems} from './MenuItems'
import {Link} from 'react-router-dom'
import './Dropdown.css'

function Dropdown() {
    const userRole = sessionStorage.getItem('userRole');
    const [click,setClick]= useState(false);
    const handleClick=()=>setClick(!click);

    if(userRole === 'admin'){
        return (
            <ul onClick={handleClick} className='dropdown-menu'>
                {AdminMenuItems.map((item,index)=>{
                    return(
                        <li key={index}>
                            <Link className={item.cName} to={item.path} onClick={()=>setClick(false)}>{item.title}</Link>
                        </li>
                    )
                })}
            </ul>
        );
    }else if(userRole === 'doctor'){
        return (
            <ul onClick={handleClick} className='dropdown-menu'>
                {DoctorMenuItems.map((item,index)=>{
                    return(
                        <li key={index}>
                            <Link className={item.cName} to={item.path} onClick={()=>setClick(false)}>{item.title}</Link>
                        </li>
                    )
                })}
            </ul>
        );
    }else{
        return (
            <ul onClick={handleClick} className='dropdown-menu'>
                {DefaultMenuItems.map((item,index)=>{
                    return(
                        <li key={index}>
                            <Link className={item.cName} to={item.path} onClick={()=>setClick(false)}>{item.title}</Link>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Dropdown

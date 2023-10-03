import React from 'react'
import './Button.css'

export function Button(){
    const userName = sessionStorage.getItem('userName');

    const handleLogout=()=>{
        sessionStorage.clear();
        window.location.pathname='/';
    }
    return(
        <>
            <button className='sign_btn' onClick={handleLogout}><i className='fa fa-user'/>{userName}</button>
        </>
    );
}
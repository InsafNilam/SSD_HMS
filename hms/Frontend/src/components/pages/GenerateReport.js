import React from 'react'
import Navbar from '../Navbar'

export default function GenerateReport() {
    return (
        <>
        <Navbar/>
            <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Appointment Report</div>
                <div className='container'></div> 
            </div>
            </div>
        </>
    )
}

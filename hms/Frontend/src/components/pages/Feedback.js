import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Navbar from '../Navbar'

export default function Feedback() {
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName');

    const [appointments,setValues]= useState([])

    useEffect(() => {
        if(userRole === 'admin'){
            axios.get('http://localhost:4000/feed-appointment')
            .then(res=>{
                setValues(res.data)
            }).catch(err=>{console.log(err)})
        }else if(userRole === 'doctor'){
            axios.get(`http://localhost:4000/doctor-treatment/${userName}`)
            .then(res=>{
                setValues(res.data)
            }).catch(err=>{console.log(err)})
        }else{
            axios.get(`http://localhost:4000/user-treatment/${userId}`)
            .then(res=>{
                setValues(res.data)
            }).catch(err=>{console.log(err)})}
    }, []);

    return (
        <>
        <Navbar/>
        <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Feedback</div>
                <div className='container feed'>
                        {
                            appointments ? appointments.map(appointment=> (
                                <div key={appointment._id}>
                                    <h3>{appointment.doctor}</h3>
                                    <p>{appointment.date} {appointment.time}</p>
                                    <p>{appointment.feed}</p>
                                </div>
                            )
                            ):null
                        }
                </div>
            </div>
        </div>
        </>
    )
}
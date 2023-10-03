import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Navbar from '../Navbar'

export default function Feedback() {
    const accessToken = sessionStorage.getItem("userToken");
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName');

    const [appointments,setValues]= useState([])

     const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    useEffect(() => {
        if(userRole === 'admin'){
            authAxios.get('/feed-appointment')
            .then(res=>{
                setValues(res.data)
            }).catch(err=>{console.log(err)})
        }else if(userRole === 'doctor'){
            authAxios.get(`/doctor-treatment/${userName}`)
            .then(res=>{
                setValues(res.data)
            }).catch(err=>{console.log(err)})
        }else{
            authAxios.get(`/user-treatment/${userId}`)
            .then(res=>{
                setValues(res.data)
            }).catch(err=>{console.log(err)})}
    }, [userId, userName, userRole]);

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
                                    <h3>Doctor Name: {appointment.doctor}</h3>
                                    <p>Date: {appointment.date} {appointment.time}</p>
                                    <p>Feed: {appointment.feed}</p>
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
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'

export default function BookingHistory() {
    const userId = sessionStorage.getItem('userId');
    const [appointments,setValues]= useState([])
    const [singleAppointment,setSingle]= useState({})

    useEffect(() => {
        axios.get(`http://localhost:4000/user-appointment/${userId}`)
        .then(res=>{
            setValues(res.data)
            if(Object.keys(res.data).length === 0)
                setSingle(res.data)
            else
                setSingle(res.data[0])
        }).catch(err=>{console.log(err)})
    }, []);
    
    return (
        <>
        <Navbar/>
        <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Booking Info</div>
                <div className='container'>
                <div className='left'>
                    <form action='#'>
                    <div className='user-details'>
                        <div className='input-box'>
                        <label className='details' htmlFor='userid'>Booking ID</label>
                        <div className='input-group disabled'>
                        <input type='text' id='userid' name='phoneNumber' value = {singleAppointment.bookId} placeholder='Enter Your User ID' disabled/>
                        <i className='fa fa-id-card-o left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='fullName'>Full Name</label>
                        <div className='input-group disabled'>
                        <input type='text' id='fullName' name='fullname' value = {singleAppointment.name} placeholder='Enter Your Name' disabled/>
                        <i className='fa fa-user left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='address'>Address</label>
                        <div className='input-group disabled'>
                        <input type='text' id='address' name='address' value={singleAppointment.address} placeholder='Enter Your Address' disabled/>
                        <i className='fa fa-address-card-o left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='email'>Email</label>
                        <div className='input-group disabled'>
                        <input type='text' id='email' name='email' value={singleAppointment.email} placeholder='Enter Your Email Address' disabled/>
                        <i className='fa fa-envelope left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                        <div className='input-group disabled'>
                        <input type='text' id='phoneNumber' name='phoneNumber' value={singleAppointment.phone} placeholder='Enter Your Phone Number' disabled/>
                        <i className='fas fa-phone-alt left-icon'/>
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                <div className='right'>
                    <div>
                        <b>Booking History</b>
                    </div>
                    <div className='table'>
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        {
                            appointments ? appointments.map(appointment=> (
                                <tr className='cursor' key={appointment._id} onClick={()=>{setSingle(appointment)}}>
                                    <td>{appointment.category}</td>
                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                </tr>
                            )
                            ):null
                        }
                    </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

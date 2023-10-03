import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow} from '@mui/material';

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../Navbar'

export default function BookingHistory() {
    const accessToken = sessionStorage.getItem("userToken");
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName');

    const [id,setId]=useState('')
    const [presc, setPresc] = useState('')
    const [treat, setTreat] = useState('')

    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true)
    const handleEditClose=()=> setIsEdit(false)

    const [appointments,setValues]= useState([])
    const [singleAppointment,setSingle]= useState({})

     const authAxios = axios.create({
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    });

    const EditData =(id)=>{
        authAxios.put(`/doctor-prescription/${id}`, {prescription : presc, treatment: treat} ).then(res=>{
            if(res.data!==null){
                setValues(appointments.filter((val)=>{
                    return val._id !== id;
                }))
            toast.success("Patient has Successfully Checked",{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    })
                }
        })
    }

    useEffect(() => {
        if(userRole === 'admin'){
            authAxios.get('/appointment').then(res=>{
                setValues(res.data)
                if(Object.keys(res.data).length === 0)
                setSingle(res.data)
            else
                setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }else if(userRole === 'doctor'){
            authAxios.get(`/appointment/${userName}`)
            .then(res =>{
                setValues(res.data)
                if(Object.keys(res.data).length === 0)
                    setSingle(res.data)
                else
                    setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }
        else{
            authAxios.get(`/user-appointment/${userId}`)
            .then(res=>{
                setValues(res.data)
                if(Object.keys(res.data).length === 0)
                    setSingle(res.data)
                else
                    setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }
    }, [userId, userName, userRole]);
    
    if(userRole === 'doctor'){
        return(
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
                        <input type='text' id='userid' name='phoneNumber' value = {singleAppointment._id} placeholder='Enter Your User ID' disabled/>
                        <i className='fas fa-id-batch left-icon'/>
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
                        <i className='fas fa-address-book left-icon'/>
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
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                        {
                            appointments ? appointments.map(appointment=> (
                                <tr className='cursor' key={appointment._id} onClick={()=>{setSingle(appointment)}}>
                                    <td>{appointment.category}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td className='edit'>
                                        <i className='fas fa-arrow-circle-right' onClick={()=>{
                                            setId(appointment._id);
                                            handleEditOpen()
                                        }}/> 
                                    </td>
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
            {/* Edit Feedback Function Dailog Box*/}
            <Grow in={isEdit} {...(isEdit ? { timeout: 500 } : {})}>
                <Dialog open={isEdit} onClose={handleEditClose} keepMounted>
                    <DialogTitle>Patient Health Details</DialogTitle>
                    <DialogContent>
                            <div className='user-details'>
                            <div className='input-box'>
                                <label className='details' htmlFor='prescription'>Prescription</label>
                                <input type='text' id='prescription' autoComplete='off' value={presc} placeholder='Enter Your Prescription' onChange={e=>{
                                    setPresc(e.target.value)
                                }}/>
                            </div>
                            <div className='input-box'>
                                <label className='details' htmlFor='treatment'>Treatment</label>
                                <input type='text' id='treatment' autoComplete='off' value={treat} placeholder='Enter Your Treatment' onChange={e=>{
                                    setTreat(e.target.value)
                                }}/>
                            </div>
                            </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                EditData(id);
                                handleEditClose();
                            }} value='Yes'/>
                            <input type='reset' onClick={handleEditClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
            </>);
    }else{
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
                            <input type='text' id='userid' name='phoneNumber' value = {singleAppointment._id} placeholder='Enter Your User ID' disabled/>
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
}

import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow} from '@mui/material';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../Navbar'

export default function TreatmentHistory() {
    toast.configure();
    const accessToken = sessionStorage.getItem("userToken");
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName');

    const [appointments,setValues]= useState([])
    const [singleAppointment,setSingle]= useState({})

    const [id,setId]=useState('')
    const [feed, setFeed] = useState('')

    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true)
    const handleEditClose=()=> setIsEdit(false)

     const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const EditData =(id)=>{
        authAxios.put(`/app-feedback/${id}`,{feed : feed}).then(res=>{
            toast.success("Feedback has been Provided",{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
            })
        }).catch(err=>{console.log(err)})
    }

    useEffect(() => {
        if(userRole === 'doctor'){
            authAxios.get(`/doctor-treatment/${userName}`)
            .then(res =>{
                setValues(res.data)
                if(Object.keys(res.data).length === 0)
                    setSingle(res.data)
                else
                    setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }else{
            authAxios.get(`/user-treatment/${userId}`)
            .then(res=>{
                setValues(res.data)
                if(Object.keys(res.data).length === 0)
                    setSingle(res.data)
                else
                    setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }
    }, []);

    // For Doctor
    if(userRole === 'doctor'){
        return(
            <>
            <Navbar/>
            <div className='body'>
                <div className='appointment-container'>
                    <div className='title'>Treatment Info</div>
                    <div className='container'>
                    <div className='left'>
                        <form action='#'>
                        <div className='user-details'>
                            <div className='input-box'>
                            <label className='details' htmlFor='userid'>Booking ID</label>
                            <div className='input-group'>
                            <input type='text' id='userid' name='phoneNumber' value = {singleAppointment._id} placeholder='Enter Your User ID' disabled/>
                            <i className='fa fa-id-card-o left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='fullName'>Full Name</label>
                            <div className='input-group'>
                            <input type='text' id='fullName' name='fullname' value = {singleAppointment.name} placeholder='Enter Your Name' disabled/>
                            <i className='fa fa-user left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='address'>Address</label>
                            <div className='input-group'>
                            <input type='text' id='address' name='address' value = {singleAppointment.address} placeholder='Enter Your Address' disabled/>
                            <i className='fa fa-address-card-o left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='email'>Email</label>
                            <div className='input-group'>
                            <input type='text' id='email' name='email' value = {singleAppointment.email} placeholder='Enter Your Email Address' disabled/>
                            <i className='fa fa-envelope left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                            <div className='input-group'>
                            <input type='text' id='phoneNumber' name='phoneNumber' value = {singleAppointment.phone} placeholder='Enter Your Phone Number' disabled/>
                            <i className='fas fa-phone-alt left-icon'/>
                            </div>
                        </div>
                        </div>
                        </form>
                    </div>
                    <div className='right table'>
                        <div>
                            <b>Treatment History</b>
                        </div>
                        <div className='table'>
                        <table>
                            <tr>
                                <th>Disease</th>
                                <th>Treatment</th>
                                <th>Prescription</th>
                                <th>Date</th>
                            </tr>
                            {
                                appointments ? appointments.map(appointment=> (
                                    <tr className='cursor' key={appointment._id} onClick={()=>{setSingle(appointment)}}>
                                        <td>{appointment.category}</td>
                                        <td>{appointment.treatment}</td>
                                        <td>{appointment.prescription}</td>
                                        <td>{appointment.date}</td>
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
    else{
        return (
            <>
            <Navbar/>
            <div className='body'>
                <div className='appointment-container'>
                    <div className='title'>Treatment Info</div>
                    <div className='container'>
                    <div className='left'>
                        <form action='#'>
                        <div className='user-details'>
                            <div className='input-box'>
                            <label className='details' htmlFor='userid'>Booking ID</label>
                            <div className='input-group'>
                            <input type='text' id='userid' name='phoneNumber' value = {singleAppointment._id} placeholder='Enter Your User ID' disabled/>
                            <i className='fa fa-id-card-o left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='fullName'>Full Name</label>
                            <div className='input-group'>
                            <input type='text' id='fullName' name='fullname' value = {singleAppointment.name} placeholder='Enter Your Name' disabled/>
                            <i className='fa fa-user left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='address'>Address</label>
                            <div className='input-group'>
                            <input type='text' id='address' name='address' value = {singleAppointment.address} placeholder='Enter Your Address' disabled/>
                            <i className='fa fa-address-card-o left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='email'>Email</label>
                            <div className='input-group'>
                            <input type='text' id='email' name='email' value = {singleAppointment.email} placeholder='Enter Your Email Address' disabled/>
                            <i className='fa fa-envelope left-icon'/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                            <div className='input-group'>
                            <input type='text' id='phoneNumber' name='phoneNumber' value = {singleAppointment.phone} placeholder='Enter Your Phone Number' disabled/>
                            <i className='fas fa-phone-alt left-icon'/>
                            </div>
                        </div>
                        </div>
                        </form>
                    </div>
                    <div className='right table'>
                        <div>
                            <b>Treatment History</b>
                        </div>
                        <div className='table'>
                        <table>
                            <tr>
                                <th>Disease</th>
                                <th>Treatment</th>
                                <th>Prescription</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            {
                                appointments ? appointments.map(appointment=> (
                                    <tr className='cursor' key={appointment._id} onClick={()=>{setSingle(appointment)}}>
                                        <td>{appointment.category}</td>
                                        <td>{appointment.treatment}</td>
                                        <td>{appointment.prescription}</td>
                                        <td>{appointment.date}</td>
                                        <td className='edit'>
                                            <i className='far fa-comments' onClick={()=>{
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
                        <DialogTitle>Provide Your Valuable Feedback</DialogTitle>
                        <DialogContent>
                                <div className='user-details'>
                                <div className='input-box'>
                                    <label className='details' htmlFor='userfeed'>Feedback</label>
                                    <input type='text' id='userfeed' autoComplete='off' value={feed} placeholder='Enter Your Feedback' onChange={e=>{
                                        setFeed(e.target.value)
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
            </>
        )
    }
}
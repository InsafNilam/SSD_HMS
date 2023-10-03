import React,{useEffect,useState,useRef} from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow ,useMediaQuery, useTheme ,Divider} from '@mui/material';

export default function ManageBooking(){
    toast.configure();
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('userRole');
    const userName = sessionStorage.getItem('userName');
    const accessToken = sessionStorage.getItem("userToken");

    const [selectedDate,setSelectedDate] = useState(new Date());
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [values,setValues]=useState({
        name:'',
        address:'',
        email:'',
        phone:'',
        date:'',
        time:'',
        doctor:'',
        category:'',
    })

    const [appointments,setValue]= useState([])
    const [singleAppointment,setSingle]= useState({})
    const [searchTerm,setSearchTerm]= useState('')
    const [id,setId]=useState('')
    
    const [isDelete,setIsDelete]=useState(false);
    const handleDeleteOpen=()=> setIsDelete(true)
    const handleDeleteClose=()=> setIsDelete(false)
    
    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true)
    const handleEditClose=()=> setIsEdit(false)

    const inputSearch=useRef();
    
    const inputName=useRef();
    const inputAddress=useRef();
    const inputEmail=useRef();
    const inputPhone=useRef();

    const handleChange=(event)=>{
        setValues({...values,
            [event.target.name]:event.target.value,
        })
    }

    const [ errors ]=useState({});

     const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const deleteData=(id)=>{
        authAxios.delete(`/appointment/${id}`).then(res=>{
            if(res.data!==null){
                setValue(appointments.filter((val)=>{
                    return val._id !== id;
                }))
                toast.success("Appointment has been cancelled",{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        })
            }
        }).catch(err=>{console.log(err)})
    }

    const updateData=(id)=>{
        if(values.name!=='' && values.address!=='' && values.email!=='' && values.date!=='Invalid date' && values.time!==''){
            authAxios.put(`/appointment/${id}`,values).then(res=>{
                setSingle(res.data);
                setValue(appointments.filter((val)=>{
                    return (val._id===id)?
                    (val.category = res.data.category,
                    val.date = res.data.date,
                    val.doctor = res.data.doctor,
                    val.address = res.data.address,
                    val.email = res.data.email,
                    val.name = res.data.name,
                    val.phone = res.data.phone,
                    val.time = res.data.time):val
                }))
                toast.success("Appointment has been updated",{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    })
            }).catch(err=>
                toast.error(err,{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
            }))
        }else
            toast.error("Appointment has not been updated",{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
            })
    }

    const timeController=(id)=>{
        return values.time===id;
    }
    const doctorController=(id)=>{
        return values.doctor===id;
    }
    const categoryController=(id)=>{
        return values.category===id;
    }

    useEffect(() => {
        if(userRole === 'doctor'){
            authAxios.get(`/appointment/${userName}`)
            .then(res =>{
                setValue(res.data)
                if(Object.keys(res.data).length === 0)
                    setSingle(res.data)
                else
                    setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }else{
            authAxios.get(`/user-appointment/${userId}`)
            .then(res=>{
                setValue(res.data)
                if(Object.keys(res.data).length === 0)
                    setSingle(res.data)
                else
                    setSingle(res.data[0])
            }).catch(err=>{console.log(err)})
        }
    }, []);

    if(userRole === 'doctor'){
        return(
            <>
            <Navbar/>
            <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Manage Booking</div>
                <div className='container'>
                <div className='left'>
                    <form action='#'>
                    <div className='user-details'>
                        <div className='input-box'>
                        <label className='details' htmlFor='userid'>Booking ID</label>
                        <div className='input-group'>
                        <input type='text' id='userid' disabled name='phoneNumber' value={singleAppointment._id} placeholder='Enter Your User ID' required/>
                        <i className='fas fa-id-badge left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='fullName'>Full Name</label>
                        <div className='input-group'>
                        <input type='text' id='fullName' disabled name='fullname' value={singleAppointment.name} placeholder='Enter Your Name' required/>
                        <i className='fa fa-user left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='address'>Address</label>
                        <div className='input-group'>
                        <input type='text' id='address' disabled name='address' value={singleAppointment.address}  placeholder='Enter Your Address' required/>
                        <i className='fas fa-address-book left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='email'>Email</label>
                        <div className='input-group'>
                        <input type='text' id='email' disabled name='email' value={singleAppointment.email}  placeholder='Enter Your Email Address' required/>
                        <i className='fa fa-envelope left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                        <div className='input-group'>
                        <input type='text' id='phoneNumber' disabled name='phoneNumber' value={singleAppointment.phone}  placeholder='Enter Your Phone Number' required/>
                        <i className='fas fa-phone-alt left-icon'/>
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                <div className='right'>
                    <div className='manage'>
                        <label htmlFor='search'>Category</label>
                        <div className='input-group'>
                            <input type='text' id='search' ref={inputSearch} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                            <i className='fa fa-search left-icon'/>
                            <i className='fa fa-times right-icon' onClick={()=>{
                                        inputSearch.current.focus();
                                        inputSearch.current.value='';
                                        setSearchTerm('');
                                    }}/>
                        </div>
                    </div>
                    <div className='table'>
            <table>
            <tr>
                <th>category</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
            {
            appointments ? appointments.filter((val)=>{
                if(searchTerm ==='') return val
                else if(val.category.toLowerCase().includes(searchTerm.toLowerCase())) return val
            }).map(val=> (
                <tr className='cursor' key={val._id} onClick={()=>{setSingle(val)}}>
                    <td>{val.category}</td>
                    <td>{val.date}</td>
                    <td className='edit'>
                        <i className='fas fa-trash-alt' onClick={()=>{
                            setId(val._id);
                            handleDeleteOpen();
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
            {/* Delete Function Dailog Box*/}
            <Grow in={isDelete} {...(isDelete ? { timeout: 500 } : {})}>
                <Dialog open={isDelete} onClose={handleDeleteClose} keepMounted>
                    <DialogTitle><i className="fas fa-exclamation-triangle"/></DialogTitle>
                    <DialogContent>Are You Sure to Cancel the Appointment?</DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='reset' onClick={()=>{
                                deleteData(id)
                                handleDeleteClose()
                            }} value='Yes, cancel it!'/>
                            <input type='submit' onClick={handleDeleteClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
        </div>
            </>)
    }
    else{
        return(
        <>
        <Navbar/>
        <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Manage Booking</div>
                <div className='container'>
                <div className='left'>
                    <form action='#'>
                    <div className='user-details'>
                        <div className='input-box'>
                        <label className='details' htmlFor='userid'>Booking ID</label>
                        <div className='input-group'>
                        <input type='text' id='userid' disabled name='phoneNumber' value={singleAppointment._id} placeholder='Enter Your User ID' required/>
                        <i className='fa fa-id-badge left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='fullName'>Full Name</label>
                        <div className='input-group'>
                        <input type='text' id='fullName' disabled name='fullname' value={singleAppointment.name} placeholder='Enter Your Name' required/>
                        <i className='fa fa-user left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='address'>Address</label>
                        <div className='input-group'>
                        <input type='text' id='address' disabled name='address' value={singleAppointment.address}  placeholder='Enter Your Address' required/>
                        <i className='fa fa-address-card-o left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='email'>Email</label>
                        <div className='input-group'>
                        <input type='text' id='email' disabled name='email' value={singleAppointment.email}  placeholder='Enter Your Email Address' required/>
                        <i className='fa fa-envelope left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                        <div className='input-group'>
                        <input type='text' id='phoneNumber' disabled name='phoneNumber' value={singleAppointment.phone}  placeholder='Enter Your Phone Number' required/>
                        <i className='fas fa-phone-alt left-icon'/>
                        </div>
                    </div>
                    </div>
                    </form>
                </div>
                <div className='right'>
                    <div className='manage'>
                        <label htmlFor='search'>Doctor</label>
                        <div className='input-group'>
                            <input type='text' id='search' ref={inputSearch} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                            <i className='fa fa-search left-icon'/>
                            <i className='fa fa-times right-icon' onClick={()=>{
                                        inputSearch.current.focus();
                                        inputSearch.current.value='';
                                        setSearchTerm('');
                                    }}/>
                        </div>
                    </div>
                    <div className='table'>
            <table>
            <tr>
                <th>category</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
            {
            appointments ? appointments.filter((val)=>{
                if(searchTerm ==='') return val
                else if(val.doctor.toLowerCase().includes(searchTerm.toLowerCase())) return val
            }).map(val=> (
                <tr className='cursor' key={val._id} onClick={()=>{setSingle(val)}}>
                    <td>{val.category}</td>
                    <td>{val.doctor}</td>
                    <td>{val.date}</td>
                    <td className='action'>
                        <i className='fas fa-edit' onClick={()=>{
                            setValues({name: val?.name, address: val?.address, category: val?.category, date: (val?.date), selectedDate: Date(val?.date), doctor: val?.doctor, email: val?.email, phone: val?.phone, time: val?.time,})
                            setId(val._id);
                            handleEditOpen()
                        }}/>            
                        <i className='fas fa-trash-alt' onClick={()=>{
                            setId(val._id);
                            handleDeleteOpen();
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
            {/* Delete Function Dailog Box*/}
            <Grow in={isDelete} {...(isDelete ? { timeout: 500 } : {})}>
                <Dialog open={isDelete} onClose={handleDeleteClose} keepMounted>
                    <DialogTitle><i className="fas fa-exclamation-triangle"/></DialogTitle>
                    <DialogContent>Are You Sure to Cancel the Appointment?</DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='reset' onClick={()=>{
                                deleteData(id)
                                handleDeleteClose()
                            }} value='Yes, cancel it!'/>
                            <input type='submit' onClick={handleDeleteClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
            {/* Edit Function Dailog Box*/}
            <Grow in={isEdit} {...(isEdit ? { timeout: 500 } : {})}>
                <Dialog open={isEdit} onClose={handleEditClose} keepMounted maxWidth={'md'} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        Are You Sure to Update the Appointment?
                        <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <div className='appointment-container'>
                        <div className='title'>Update Appointment</div>
                        <div className='container'>
                        <form action='#'>
                            <div className='user-details'>
                            <div className='input-box'>
                                <label className='details' htmlFor='fullName'>Full Name</label>
                                <div className='input-group'>
                                    <input type='text' autoComplete='off' id='fullName' value={values.name} ref={inputName} name='name' placeholder='Enter Your Name' onChange={handleChange}/>
                                    <i className='fa fa-user left-icon'/>
                                    <i className={!errors.name?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                        inputName.current.focus();
                                        inputName.current.value='';
                                        values.name='';
                                    }}/>
                                </div>
                                {errors.name && <p className='error'>{errors.name}</p>}
                            </div>
                            <div className='input-box'>
                                <label className='details' htmlFor='address'>Address</label>
                                <div className='input-group'>
                                    <input type='text' autoComplete='off' id='address' value={values.address} name='address' ref={inputAddress} placeholder='Enter Your Address' required onChange={handleChange}/>
                                    <i className='fa fa-address-card-o left-icon'/>
                                    <i className={!errors.address?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                        inputAddress.current.focus();
                                        inputAddress.current.value='';
                                        values.address='';
                                    }}/>
                                </div>
                                {errors.address && <p className='error'>{errors.address}</p>}
                            </div>
                            <div className='input-box'>
                                <label className='details' htmlFor='email'>Email</label>
                                <div className='input-group'>
                                    <input type='text' autoComplete='off' id='email' name='email' value={values.email} ref={inputEmail} placeholder='Enter Your Email Address' onChange={handleChange}/>
                                    <i className='fa fa-envelope left-icon'/>
                                    <i className={!errors.email?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                    inputEmail.current.focus();
                                    inputEmail.current.value='';
                                    values.email='';
                                    }}/>
                                </div>
                                {errors.email && <p className='error'>{errors.email}</p>}
                            </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                            <div className='input-group'>
                                <input type='text' autoComplete='off' id='phoneNumber' name='phone' value={values.phone}  ref={inputPhone} placeholder='Enter Your Phone Number' onChange={handleChange}/>
                                <i className='fa fa-phone left-icon'/>
                                <i className={!errors.phone?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                    inputPhone.current.focus();
                                    inputPhone.current.value='';
                                    values.phone='';
                                }}/>
                            </div>
                            {errors.phone && <p className='error'>{errors.phone}</p>}
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='category'>Category</label>
                            <div className='input-group'>
                            <select id='category' name='category' onChange={handleChange}>
                                <option value='Heart' selected={categoryController('Heart')}>Heart</option>
                                <option value='Bone' selected={categoryController('Bone')}>Bone</option>
                                <option value='Skin' selected={categoryController('Skin')}>Skin</option>
                                <option value='Hand' selected={categoryController('Hand')}>Hand</option>
                            </select>
                            <i className='fa fa-list left-icon'/>
                            </div>
                        </div>
                        <div className='input-box date'>
                            <label className='details' htmlFor='date'>Date</label>
                            <div className='date-group'>
                            <DatePicker required selected={selectedDate} 
                                minDate={new Date()} placeholderText="Select a date" dateFormat='yyyy/MM/dd' autoComplete='off' id='date' onChange={ (date)=> {
                                    setSelectedDate(date);
                                    setValues({...values, date});
                                }
                            }/>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='details' htmlFor='doctor'>Select Doctor</label>
                            <div className='input-group'>
                            <select id='doctor' name='doctor' onChange={handleChange}>
                                <option value='John' selected={doctorController('John')}>John</option>
                                <option value='Peiris' selected={doctorController('Peiris')}>Peiris</option>
                                <option value='Tom' selected={doctorController('Tom')}>Tom</option>
                                <option value='King' selected={doctorController('King')}>King</option>
                            </select>
                            <i className='fa fa-list left-icon'/>
                            </div>
                        </div>
                        <div className='time-details'>
                            <p className='time-title'>Available Times</p>
                            <div className='time-group'>
                            <input type='radio' id='time1' checked={timeController('9.45a.m')} name='time' value='9.45a.m' onChange={handleChange}/>
                            <label htmlFor='time1'>9.45 a.m</label>
                            <input type='radio' id='time2' checked={timeController('10.30a.m')} name='time'value='10.30a.m' onChange={handleChange}/>
                            <label htmlFor='time2'>10.30 a.m</label>
                            <input type='radio' id='time3' checked={timeController('11.00a.m')} name='time'value='11.00a.m' onChange={handleChange}/>
                            <label htmlFor='time3'>11.00 a.m</label>
                            <input type='radio' id='time4' checked={timeController('12.00p.m')} name='time'value='12.00p.m' onChange={handleChange}/>
                            <label htmlFor='time4'>12.00 p.m</label>
                            <input type='radio' id='time5' checked={timeController('2.00p.m')} name='time' value='2.00p.m' onChange={handleChange}/>
                            <label htmlFor='time5'>2.00 p.m</label>
                            <input type='radio' id='time6' checked={timeController('4.00p.m')} name='time' value='4.00p.m' onChange={handleChange}/>
                            <label htmlFor='time6'>4.00 p.m</label>
                            <input type='radio' id='time7' checked={timeController('6.00p.m')} name='time' value='6.00p.m' onChange={handleChange}/>
                            <label htmlFor='time7'>6.00 p.m</label>
                            </div>
                        </div>
                        <div className='input-check'>
                            <input type='checkbox' id='compulsory' name='compulsory' value='true' checked/>
                            <label htmlFor='compulsory'>
                                By Checking this, you agree to our terms and conditions
                            </label>
                        </div>
                        </div>
                    </form>
                    </div>
                    </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                    updateData(id)
                                    handleEditClose()  
                            }} value='Yes, update it!'/>
                            <input type='reset' onClick={handleEditClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
        </div>
        </>
    );
    }
}
import React,{useState, useEffect,useRef} from 'react';
import Navbar from '../Navbar';
import './MakeApp.css';
import axios from 'axios'

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import {AppointmentValidate} from '../loginform/Validate';


export default function MakeApp(){
    toast.configure();
    const accessToken = sessionStorage.getItem("userToken");
    const [selectedDate,setSelectedDate]= useState(new Date());
    const [values,setValues]=useState({
        userId:sessionStorage.getItem('userId'),
        name:'',
        address:'',
        email:'',
        phone:'',
        date:moment(selectedDate).format('DD MMM YYYY'),
        time:'',
        doctor:'John',
        category:'Heart',
        feed:'Not Provided Yet',
        prescription:'None',
        isConsulted: false,
        treatment: 'None',
    });

    const inputName=useRef();
    const inputAddress=useRef();
    const inputEmail=useRef();
    const inputPhone=useRef();

    const handleChange=(event)=>{
        setValues({...values,
            [event.target.name]:event.target.value,
        })
    }
    const [errors,setErrors]=useState({});

    const handleSubmit=(event)=>{
        event.preventDefault();
        // Make Sure there is no empty spaces trailing and leading
        Object.keys(values).forEach(k=>values[k] = typeof values[k]==='string'?values[k].trim():values[k]);
        setErrors(AppointmentValidate(values));
    }

     const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    useEffect(() => {
            if(Object.keys(errors).length===0 && values.name!=='' && values.address!=='' && values.email!=='' && values.date!=='Invalid date' && values.time!==''){
                authAxios.post('/appointment',values).then(res=>{
                        toast.success(res.data.msg,{
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                        })
                        setInterval(()=>window.location.pathname = "/booking-history",1000)
                    }).catch(e => {
                    if (e.response) 
                            toast.info(e.response.data.msg,{
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                        })
                    else console.log('Error', e.message)
                });
            }
        }, [errors])
    return(
        <>
        <Navbar/>
            <div className='body'>
            <div className='appointment-container'>
            <div className='title'>Book Appointment</div>
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
                        <input type='text' autoComplete='off' id='address' value={values.address} name='address' ref={inputAddress} placeholder='Enter Your Address' onChange={handleChange}/>
                        <i className='fas fa-address-book left-icon'/>
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
                        <i className='fas fa-phone-alt left-icon'/>
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
                            <option value='Heart'>Heart</option>
                            <option value='Bone'>Bone</option>
                            <option value='Skin'>Skin</option>
                            <option value='Hand'>Hand</option>
                        </select>
                        <i className='fa fa-list left-icon'/>
                        </div>
                    </div>
                    <div className='input-box date'>
                        <label className='details' htmlFor='date'>Date</label>
                        <div className='date-group'>
                        <DatePicker required selected={selectedDate}
                        minDate={new Date()} placeholderText='Select a Date' dateFormat='yyyy/MM/dd' autoComplete='off' id='date' onChange={(date)=>{values.date=moment(date).format('DD MMM YYYY'); setSelectedDate(date)}
                        }/>
                        </div>
                        {errors.date && <p className='error'>{errors.date}</p>}
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='doctor'>Select Doctor</label>
                        <div className='input-group'>
                        <select id='doctor' name='doctor' onChange={handleChange}>
                            <option value='John'>John</option>
                            <option value='Peiris'>Peiris</option>
                            <option value='Tom'>Tom</option>
                            <option value='King'>King</option>
                        </select>
                        <i className='fa fa-list left-icon'/>
                        </div>
                    </div>
                    <div className='time-details'>
                        <p className='time-title'>Available Times</p>
                        <div className='time-group'>
                        <input type='radio' id='time1' name='time' value='9.45a.m' onChange={handleChange}/>
                        <label htmlFor='time1'>9.45 a.m</label>
                        <input type='radio' id='time2' name='time'value='10.30a.m' onChange={handleChange}/>
                        <label htmlFor='time2'>10.30 a.m</label>
                        <input type='radio' id='time3' name='time'value='11.00a.m' onChange={handleChange}/>
                        <label htmlFor='time3'>11.00 a.m</label>
                        <input type='radio' id='time4' name='time'value='12.00p.m' onChange={handleChange}/>
                        <label htmlFor='time4'>12.00 p.m</label>
                        <input type='radio' id='time5' name='time' value='2.00p.m' onChange={handleChange}/>
                        <label htmlFor='time5'>2.00 p.m</label>
                        <input type='radio' id='time6' name='time' value='4.00p.m' onChange={handleChange}/>
                        <label htmlFor='time6'>4.00 p.m</label>
                        <input type='radio' id='time7' name='time' value='6.00p.m' onChange={handleChange}/>
                        <label htmlFor='time7'>6.00 p.m</label>
                        </div>
                    </div>
                    <div className='input-check'>
                        <input type='checkbox' id='compulsory' checked/>
                        <label htmlFor='compulsory'>
                            By Checking this, you agree to our terms and conditions
                        </label>
                    </div>
                </div>
                <div className='button'>
                    <input type='reset' value='Cancel'/>
                    <input type='submit' onClick={handleSubmit} value='Book Now'/>
                </div>
            </form>
            </div>
        </div>
        </div>
        </>
    );
}
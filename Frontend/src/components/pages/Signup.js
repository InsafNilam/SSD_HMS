import React,{useState,useRef,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import welcome from '../../assets/welcome.jpg';

import {SignUpValidate} from '../loginform/Validate';

export default function SignUp(){
    toast.configure();
    const [values,setValues]=useState({
        username:'',
        email:'',
        password:'',
        userconfirmpass:''
    });

    const inputUserName=useRef();
    const inputUserEmail=useRef();
    const inputUserPass=useRef();
    const inputUserConfirm=useRef();

    const handleChange=(event)=>{
        setValues({...values,
            [event.target.name]:event.target.value,
        })
    }

    const [errors,setErrors]=useState({});

    const handleSubmit=(event)=>{
        event.preventDefault();
        // Make Sure there is no spaces at the trailing and leading
        Object.keys(values).forEach(k=>values[k]=values[k].trim());
        // Validate input Fields
        setErrors(SignUpValidate(values));
    }

    useEffect(() => {
        if(Object.keys(errors).length===0 && values.email!=='' && values.password!=='' && values.userconfirmpass!=='' && values.username!==''){
            axios.post('/sign-up',values).then((res)=>{
                let userId = res.data.id;
                let userName = res.data.name;
                let userToken = res.data.token;
                
                toast.success("User has succesfully registered",{
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        })
                if(userToken!==null){
                    sessionStorage.setItem('isAuth',"true");
                    sessionStorage.setItem('userId',userId);
                    sessionStorage.setItem('userRole',"patient");
                    sessionStorage.setItem('userName',userName);
                    sessionStorage.setItem("userToken", userToken);
                    setInterval(()=>window.location.pathname = "/home",1000)
                }
            }).catch(e => {
                    if (e.response) 
                        toast.warn(e.response.data.msg,{
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
        <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Sign Up</div>
                <div className='container login-form'>
                    <div className='left login sign'>
                        <img src={welcome} alt='welcome user'/>
                        <div>
                            <h2>Welcome Back!</h2>
                            <p>To keep Connected with us please login with your personal info</p>
                        </div>
                        <div className='btn'>
                            <Link to='/'>
                                <button>Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className='right'>
                        <form action='#'>
                            <div className='user-details'>
                                <div className='input-box'>
                                    <label className='details' htmlFor='username'>UserName</label>
                                    <div className='input-group'>
                                    <input type='text' id='username' ref={inputUserName} name='username' value={values.username} placeholder='Enter Your UserName' onChange={handleChange}/>
                                    <i className='fa fa-user left-icon'/>
                                    <i className={!errors.username?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                        inputUserName.current.focus();
                                        inputUserName.current.value='';
                                        values.username='';
                                    }}/>
                                    </div>
                                    {errors.username && <p className='error'>{errors.username}</p>}
                                </div>
                                <div className='input-box'>
                                    <label className='details' htmlFor='useremail'>Email</label>
                                    <div className='input-group'>
                                    <input type='email' ref={inputUserEmail} id='useremail' value={values.email} name='email' placeholder='Enter Your Email' onChange={handleChange}/>
                                    <i className='fa fa-envelope left-icon'/>
                                    <i className={!errors.email?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                        inputUserEmail.current.focus();
                                        inputUserEmail.current.value='';
                                        values.email='';
                                    }}/>
                                    </div>
                                    {errors.email && <p className='error'>{errors.email}</p>}
                                </div>
                                <div className='input-box'>
                                    <label className='details' htmlFor='userpass'>Password</label>
                                    <div className='input-group'>
                                    <input type='password' ref={inputUserPass} id='userpass' value={values.password} name='password' placeholder='Enter Your Password' onChange={handleChange}/>
                                    <i className='fa fa-key left-icon'/>
                                    <i className={!errors.password?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                        inputUserPass.current.focus();
                                        inputUserPass.current.value='';
                                        values.password='';
                                    }}/>
                                    </div>
                                    {errors.password&& <p className='error'>{errors.password}</p>}
                                </div>
                                <div className='input-box'>
                                    <label className='details' htmlFor='userconfirmpass'>Confirm Password</label>
                                    <div className='input-group'>
                                    <input type='password' ref={inputUserConfirm} id='userconfirmpass' value={values.userconfirmpass} name='userconfirmpass' placeholder='Retype Your Password' onChange={handleChange}/>
                                    <i className='fa fa-key left-icon'/>
                                    <i className={!errors.userconfirmpass?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                                        inputUserConfirm.current.focus();
                                        inputUserConfirm.current.value='';
                                        values.userconfirmpass='';
                                    }}/>
                                    </div>
                                    {errors.userconfirmpass && <p className='error'>{errors.userconfirmpass}</p>}
                                </div>
                            </div>
                            <div className='button'>
                                <input type='submit' value='Sign Up' onClick={handleSubmit}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
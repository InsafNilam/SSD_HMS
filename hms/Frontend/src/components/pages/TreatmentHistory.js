import React from 'react'
import Navbar from '../Navbar'

export default function TreatmentHistory() {
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
                        <label className='details' htmlFor='userid'>User ID</label>
                        <div className='input-group'>
                        <input type='text' id='userid' name='phoneNumber' placeholder='Enter Your User ID' required/>
                        <i className='fa fa-id-card-o left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='fullName'>Full Name</label>
                        <div className='input-group'>
                        <input type='text' id='fullName' name='fullname' placeholder='Enter Your Name' required/>
                        <i className='fa fa-user left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='address'>Address</label>
                        <div className='input-group'>
                        <input type='text' id='address' name='address' placeholder='Enter Your Address' required/>
                        <i className='fa fa-address-card-o left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='email'>Email</label>
                        <div className='input-group'>
                        <input type='text' id='email' name='email' placeholder='Enter Your Email Address' required/>
                        <i className='fa fa-envelope left-icon'/>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='details' htmlFor='phoneNumber'>Phone Number</label>
                        <div className='input-group'>
                        <input type='text' id='phoneNumber' name='phoneNumber' placeholder='Enter Your Phone Number' required/>
                        <i className='fa fa-phone left-icon'/>
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
                            <th>AID</th>
                            <th>Disease</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Condition</th>
                        </tr>
                        <tr>
                            <td>1002</td>
                            <td>DEF</td>
                            <td>Operation</td>
                            <td>12-03-21</td>
                            <td>Normal</td>
                        </tr>
                        <tr>
                            <td>1001</td>
                            <td>ABC</td>
                            <td>Pills</td>
                            <td>23-12-21</td>
                            <td>Vital</td>
                        </tr>
                    </table>
                    </div>
               </div>
               </div>
            </div>
        </div>
        </>
    )
}
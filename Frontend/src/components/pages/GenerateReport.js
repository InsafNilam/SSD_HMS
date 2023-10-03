import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import moment from 'moment';

import {Pie} from 'react-chartjs-2'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow ,useMediaQuery, useTheme ,Divider} from '@mui/material';

export default function GenerateReport() {
    const accessToken = sessionStorage.getItem("userToken");
    const date = moment(new Date()).format('DD MMM YYYY')
    const [active,setActive] = useState(0);
    const [notActive,setNotActive] = useState(0);
    const [noFeeds,setNoFeeds] = useState(0);
    const [noApp,setNoApp] = useState(0);

    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true)
    const handleEditClose=()=> setIsEdit(false)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

     const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // Pie Chart Data
    const state = {
        labels:['Attended Patient','Not Attended Patient'],

        datasets: [
            {
            label: 'Patients',
            backgroundColor: [
                '#B21F00',
                '#C9DE00'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            ],
            // noFeeds: isConsulted{true}
            // noApp: isConsulted{false}
            data: [(noFeeds/(noFeeds + noApp)*100).toFixed(2),(noApp/(noFeeds + noApp)*100).toFixed(2)]
            }
        ]
    }


    useEffect(()=>{
        // Get Consulted records today
        authAxios.get(`/report-not/${date}`).then(res=>{
            setActive(res.data.length);
        }).catch(err=> console.log(err))
        // Get Not Consulted Records today
        authAxios.get(`/report/${date}`).then(res=>{
            setNotActive(res.data.length);
        }).catch(err=> console.log(err))
        // Get Feedbacks up to now
        authAxios.get('/feed-appointment/').then(res=>{
            setNoFeeds(res.data.length);
        }).catch(err=> console.log(err))
        // Get Appointments up to now
        authAxios.get('/appointment/').then(res=>{
            setNoApp(res.data.length);
        }).catch(err=> console.log(err))
    },[])

    return (
        <>
        <Navbar/>
            <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Appointment Report</div>
                <h5 className='date'>{date}</h5>
                <div className='container feed'>
                    <div>
                        <h3>Active Patients</h3>
                        <p>{active}</p>
                    </div>
                    <div>
                        <h3>Consulted Patients</h3>
                        <p>{notActive}</p>
                    </div>
                    <div>
                        <h3>Feedbacks</h3>
                        <p>{noFeeds}</p>
                    </div>
                    <div>
                        <h3>No of Appointments</h3>
                        <p>{noFeeds + noApp}</p>
                    </div>
                    <Pie
                        data={state}
                        options={{
                            title:{
                            display:true,
                            text:'Patient',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }}
                        />
                        <div className='preview'>
                            <input type='submit' value='Preview' onClick={handleEditOpen}/>
                        </div>
                </div> 
            </div>
            </div>
            {/* Edit Function Dailog Box*/}
            <Grow in={isEdit} {...(isEdit ? { timeout: 500 } : {})}>
                <Dialog open={isEdit} onClose={handleEditClose} keepMounted maxWidth ={'lg'} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        Preview of the Appointmnet Report 
                    <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <div className='appointment-container'>
                        <div className='title'>Appointment Report</div>
                        <h5 className='date'>{date}</h5>
                        <div className='container feed'>
                            <div>
                                <h3>Active Patients</h3>
                                <p>{active}</p>
                            </div>
                            <div>
                                <h3>Consulted Patients</h3>
                                <p>{notActive}</p>
                            </div>
                            <div>
                                <h3>Feedbacks</h3>
                                <p>{noFeeds}</p>
                            </div>
                            <div>
                                <h3>No of Appointments</h3>
                                <p>{noFeeds + noApp}</p>
                            </div>
                            <Pie
                                data={state}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Patient',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                />
                        </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='button confirm'>
                            <input type='submit' onClick={()=>{
                                    window.print()
                                    handleEditClose()  
                            }} value='Print'/>
                            <input type='reset' onClick={handleEditClose} value='Cancel'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
        </>
    )
}

import React from 'react'
import Navbar from '../Navbar';
import AppointmentCard from './AppointmentCard';
import img1 from '../../assets/neuro.png';
import img2 from '../../assets/heart.jpg';
import img3 from '../../assets/ear.jpg';
import img4 from '../../assets/radio.jpeg';
import img5 from '../../assets/Fertility.jpg';

export default function ContactUs(){
    return(
        <>
        <Navbar/>
        <div className='card-group-1'>
        <div className='card'>
            <div className='overflow'>
                <img src={img1} alt='Neuro'/>
            </div>
            <div className='card-body'>
                <div className='card-title'>
                    <h4>Neuro Centre</h4>
                </div>
                <div className='card-text'> 
                    <p>Neuro Care Services is a comprehensive healthcare provider specializing in the diagnosis, treatment, and management of neurological conditions and disorders. Our dedicated team of neurologists, neurosurgeons, and other healthcare professionals are committed to delivering high-quality care to patients with conditions affecting the brain, spinal cord, and nervous system.</p>
                </div>
            </div>
        </div>
        <div className='card'>
            <div className='overflow'>
                <img src={img2} alt='Heart'/>
            </div>
            <div className='card-body'>
                <div className='card-title'>
                    <h4>Heart Centre</h4>
                </div>
                <div className='card-text'> 
                    <p>A lot of people may have already experienced chest pain or tightness for several times. Are you aware that this is a warning sign of some types of lungs and cardiovascular diseases? It’s also one of the dangerous signs of “Heart Attack.” A heart attack is a serious medical emergency caused by a blocked flow of blood, making cardiac muscles function ineffectively. It will lead to acute heart failure or death if the patient does not receive the treatment on time.</p>
                </div>
            </div>
        </div>
        <div className='card'>
            <div className='overflow'>
                <img src={img3} alt='Ear'/>
            </div>
            <div className='card-body'>
                <div className='card-title'>
                    <h4>Ear Nose & Throat Care</h4>
                </div>
                <div className='card-text'> 
                    <p>At our clinic, we have a dedicated team of medical professionals specializing in Ear, Nose, and Throat (ENT) care. This team includes experienced ENT specialists, skilled nurses, speech therapists, and audiologists, all committed to providing exceptional care to our patients. To ensure the best possible treatment outcomes, we employ cutting-edge technology for a wide range of ENT disorders. These include conditions such as rhinitis, sinusitis, allergies, snoring, sleep apnea, ear infections, hearing loss, tinnitus, balance disorders, voice disorders, as well as head and neck cancers, including thyroid and salivary tumors.</p>
                </div>
            </div>
        </div>
        </div>
        <div className='card-group-2'>
        <div className='card'>
            <div className='overflow'>
                <img src={img4} alt='Radio'/>
            </div>
            <div className='card-body'>
                <div className='card-title'>
                    <h4>Radiology & Imaging</h4>
                </div>
                <div className='card-text'> 
                    <p>At we take pride in offering advanced and comprehensive radiology services to our patients. Our Radiology Department is staffed with highly skilled radiologists, technologists, and support staff who are dedicated to providing exceptional care and accurate diagnoses. State-of-the-art Imaging Technology: We are equipped with the latest imaging technology, including digital X-ray machines, computed tomography (CT) scanners, magnetic resonance imaging (MRI) scanners, ultrasound machines, Interventional radiology procedures,3D mammography and DEXA scans. Our cutting-edge technology ensures precise and detailed images, enabling our radiologists to make accurate diagnoses.</p>
                </div>
            </div>
        </div>
        <div className='card'>
            <div className='overflow'>
                <img src={img5} alt='Fertilityy'/>
            </div>
            <div className='card-body'>
                <div className='card-title'>
                    <h4>Fertility Care</h4>
                </div>
                <div className='card-text'> 
                    <p>Pregnancy is a miracle of life, but 1 in 6 couples worldwide face challenges when trying to conceive. Factors like defective egg release, blocked fallopian tubes, or sperm abnormalities can cause infertility. Fortunately, there are simple tests to assess fertility.</p>
                </div>
            </div>
        </div>
        </div>

        </>
    );
}
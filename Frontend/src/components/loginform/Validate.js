const LoginValidate = (values) => {
    let errors={}
    if(!values.email){
        errors.email="Email is Required"
    }else if(!/^\w++(?:[-]?\w+)*+@\w++(?:[-]?\w+)*+(?:\.\w{2,3})++$/.test(values.email)){
        errors.email="Email address invalid"
    }

    if(!values.password){
        errors.password="Password is Required"
    }

    return errors;
};

const SignUpValidate=(values)=>{
    let errors={}
    if(!values.username){
        errors.username="UserName is Required"
    }
    if(!values.password){
        errors.password="Password is Required"
    }else if(values.password.length < 6){
        errors.password="Password needs to be atleast 6 characters in length"
    }

    if(!values.email){
        errors.email="Email is Required"
    }else if(!/^\w++(?:[-]?\w+)*+@\w++(?:[-]?\w+)*+(?:\.\w{2,3})++$/.test(values.email)){
        errors.email="Email address invalid"
    }

    if(!values.userconfirmpass){
        errors.userconfirmpass="Password is Required"
    }else if(values.userconfirmpass!==values.password){
        errors.userconfirmpass="Password do not match"
    }

    return errors;
};
const AppointmentValidate=(values)=>{
    let errors={}

    if(!values.name){
        errors.name="Patient Name is Required"
    }
    if(!values.address){
        errors.address="Patient Address is Required"
    }

    if(!values.email){
        errors.email="Patient Email address is Required"
    }else if(!/^\w++(?:[-]?\w+)*+@\w++(?:[-]?\w+)*+(?:\.\w{2,3})++$/.test(values.email)){
        errors.email="Patient Email address invalid"
    }

    if(!values.phone){
        errors.phone="Patient Phone Number is Required"
    }else if(isNaN(+values.phone) || values.phone.length !== 10){
        errors.phone="Patient Phone Number is Invalid"
    }
    if(values.date==="Invalid date"){
        errors.date ="Please Provide a Date"
    }
    
    return errors;
}
export {
    LoginValidate,
    SignUpValidate,
    AppointmentValidate
}
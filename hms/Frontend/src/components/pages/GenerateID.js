const GenerateID=(length,prefix)=>{
    if(length<10) return prefix.concat('00',length);
    else if(length<100) return prefix.concat('0',length);
    else return prefix.concat(length);
}

export default GenerateID;
import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import LoadingModal from "../components/LoadingModal";
import Popup from "../components/Popup";
import { useState } from "react";
import { motion } from 'framer-motion'

import '../App.css';


const CreateGraduate = () => {

    const apiURL = 'http://localhost:5082/api/graduates/'

    const[loading, setLoading] = useState(false);
    const [canClick, setCanClick] = useState(false);
    const[buttonEnabled, setButtonEnabled] = useState(true);
    const[popup, setPopup] = useState(false);
    const[popupMessage, setPopupMessage] = useState("Test")
    const[popupColor, setPopupColor] = useState("green")
    const[buttonClicked, setButtonClicked] = useState(false);
    const[slideAnim, setSlideAnim] = useState(false);

    const[newGraduate, setNewGraduate] = useState({
        graduateId: null,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        dateOfBirth: '',
        age: null,
        dateCreated: null,
        dateEdited: null,
        isDeleted: false
    });

    const[dataValidation, setValidation] = useState({
        firstName: { message: '', valid: false},
        lastName: { message: '', valid: false},
        phoneNumber: { message: '', valid: false},
        emailAddress: { message: '', valid: false},
        dateOfBirth: { message: '', valid: false},
        valid: false
    });

    function handleValueChange(e){
        const { name, value } = e.target;
        
        setNewGraduate(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const slideInRightVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: { scaleX: 1, opacity: 1 }, 
    };

    const slideInLeftVariants = {
        hidden: { x: "-100vw", opacity: 0 },
        visible: { x: 0, opacity: 1 }, 
    };

    const FadeInVariants = {
        hidden: { opacity: 0},
        visible: { opacity: 1}
    };

    useEffect(() => {
        checkValidation();
    }, [newGraduate])

    async function addNewGraduate(e) {
        e.preventDefault();
        setLoading(true);
        setButtonEnabled(false)
        console.log(dataValidation);

        if (!dataValidation.valid) {
            console.log("data validation failed")
            setLoading(false);
            setButtonEnabled(true);
            return;
        }

        const apiEndpoint = apiURL + 'add'
        const json = JSON.stringify(newGraduate);
        console.log(json);
        try
        {
            const result = await fetch(apiEndpoint, {
                method: 'POST',
                body: json,
                headers: { "content-type": "application/json"}
            });
            if(result.ok)
            {
                console.log("grad added");
                setPopupColor('green');
                setPopupMessage('Graduate added successfully');
                setPopup(true);

            }else
            {
                console.log("something went wrong"); 
                const json = await result.json();
                setLoading(false);         
                setButtonEnabled(true);
                
                if(json.message === 'Email address already in use!'){
                    setPopupColor('orange');
                    setPopupMessage('Email address already in use!');
                    setPopup(true); 
                }else{
                    setPopupColor('orange');
                    setPopupMessage('Failed to add graduate');
                    setPopup(true); 
                }
                 
                return null;
            }

            setLoading(false);
            setButtonEnabled(true);

        }catch(err)
        {
            console.log(err.message);
            setLoading(false);
            setPopupColor('red');
            setPopupMessage('Failed to add graduate:' + err.message);
            setPopup(true);
            setButtonEnabled(true);
            return null;
        }
    
        
    }
    
    function checkValidation() {
        checkNameValidity();
        checkSurnameValidity();
        checkPhoneNumberValidity();
        checkEmailValidity();
        checkDOBValidity();

        let isValid = true;

        for(let key in dataValidation){
            if(!dataValidation[key].valid){
                isValid = false;
                break;
            }
        }

        setValidation(prevState => ({...prevState, valid: true}));
    }
    
    function checkNameValidity() {
        if (newGraduate.firstName !== "") {
            setValidation(prevState => ({ ...prevState,  firstName: { ...prevState.firstName, message: "", valid: true }}));
        } else {
            setValidation(prevState => ({ ...prevState, firstName: { ...prevState.firstName, message: "Please enter a name!", valid: false }}));
        }
    }
    
    function checkSurnameValidity() {
        if (newGraduate.lastName !== "") {
            setValidation(prevState => ({ ...prevState, lastName: { ...prevState.lastName, message: "", valid: true }}));
        } else {
            setValidation(prevState => ({ ...prevState, lastName: { ...prevState.lastName, message: "Please enter a surname!", valid: false }}));
        }
    }
    
    function checkPhoneNumberValidity() {
        if (newGraduate.phoneNumber === "") {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "", valid: true }}));
        } else if (newGraduate.phoneNumber.charAt(0) !== "+") {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "Phone number is invalid! Format Example: +27824012002", valid: false }}));
        } else {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "", valid: true }}));
        }
    }
    
    function checkEmailValidity() {
        if (newGraduate.emailAddress === "") {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "", valid: true }}));
        } else if (!newGraduate.emailAddress.includes("@") || !newGraduate.emailAddress.includes(".")) {
            setValidation(prevState => ({ ...prevState, emailAddress: { ...prevState.emailAddress, message: "Email address is invalid! Format Example: name@email.com", valid: false }}));
        } else {
            setValidation(prevState => ({ ...prevState, emailAddress: { ...prevState.emailAddress, message: "", valid: true }}));
        }
    }
    
    function checkDOBValidity() {
        if (newGraduate.dateOfBirth === "") {
            setValidation(prevState => ({ ...prevState, dateOfBirth: { ...prevState.dateOfBirth, message: "Please enter a date of birth!", valid: false }}));
        } else if (new Date(newGraduate.dateOfBirth).getTime() >= Date.now()) {
            setValidation(prevState => ({ ...prevState, dateOfBirth: { ...prevState.dateOfBirth, message: "Please enter a valid date of birth!", valid: false }}));
        } else {
            setValidation(prevState => ({ ...prevState, dateOfBirth: { ...prevState.dateOfBirth, message: "", valid: true }}));
        }
    }
    

    return (
        <div>
            <Navbar />
            {loading ? <LoadingModal/> : <></>}
            {popup && <Popup  message={popupMessage} color={popupColor} setPopupState={setPopup}/>}
            <div className="w-screen h-[10vh] md:h-[20vh] flex justify-center items-center pl-5 md:pl-14 grow">
                <div className="">
                    <motion.h3 className="uppercase text-[3vw] md:text-2xl text-white font-[400]" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}>Level Up 2024</motion.h3>
                    <motion.h1 className="uppercase text-2xl md:text-7xl text-white font-bold" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}>Create Graduate</motion.h1>
                </div>
                <div className="flex grow flex-col gap-0.5 md:gap-1 h-[30%] pl-5 md:pl-20 mt-5 md:mt-10">
                    <motion.div className="bg-blue grow z-10 grow" variants={ slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.3 }} whileHover={{ translateX: "200px"}} />
                    <motion.div className="bg-green grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.4 }} whileHover={{ translateX: "200px"}} />
                    <motion.div className="bg-orange grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.5 }} whileHover={{ translateX: "200px"}} />
                    <motion.div className="bg-red grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.6 }} whileHover={{ translateX: "200px"}} />
                </div>
            </div>

            <section className="md:px-12 px-4 mt-6">
                <form className="flex flex-col md:grid md:grid-cols-2 gap-x-40 gap-y-6 md:gap-y-14">
                    <div className="flex flex-col">
                        <label htmlFor="Name" className="text-orange text-md">Name</label>
                        <input id="Name" name="firstName" type="Text" value={newGraduate.firstName} onChange={handleValueChange} className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.firstName.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.firstName.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col col-start-2 col-end-2">
                        <label htmlFor="Surname" className="text-orange text-md">Surname</label>
                        <input id="Surname" name="lastName" type="Text" value={newGraduate.lastName} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.lastName.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.lastName.message}</label> : <></> : <></>}    
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="PhoneNumber" className="text-orange text-md">Phone Number</label>
                        <input id="PhoneNumber" name="phoneNumber" type="tel" value={newGraduate.phoneNumber} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.phoneNumber.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.phoneNumber.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col col-start-2 col-end-2">
                        <label htmlFor="EmailAddress" className="text-orange text-md">Email Address</label>
                        <input id="EmailAddress" name="emailAddress" type="email" value={newGraduate.emailAddress} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.emailAddress.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.emailAddress.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="DateOfBirth" className="text-orange text-md">Date Of Birth</label>
                        <input id="DateOfBirth" name="dateOfBirth" type="date" value={newGraduate.dateOfBirth} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.dateOfBirth.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.dateOfBirth.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col col-start-2 col-end-2 items-center md:items-end">
                        <motion.button 
                            className="md:static bg-red w-10/12 md:w-[20vw] text-white p-1 rounded-full micro-5 text-[7vw] md:text-[2vw] flex justify-center items-center pr-1 md:pl-3 pr-3 md:pr-2 uppercase"
                            variants={FadeInVariants}
                            initial="hidden"
                            animate="visible"
                            transition={canClick ? {} : { duration: 0.5, ease: "easeOut", delay: 1 }}
                            onAnimationComplete={() => setCanClick(true)}
                            whileHover={{ 
                                scale: 1.1,
                                transition: { type: "spring", stiffness: 400, damping: 10, delay: 0 },
                            }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!buttonEnabled}
                            onClick={(e)=>{addNewGraduate(e); setButtonClicked(true);}}>
                            Add new Graduate
                            <img src="/assets/icons/rocket_white.webp" className="w-[8vw] md:w-[3vw] ml-[12vw] md:ml-[2vw]" />
                        </motion.button>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default CreateGraduate;
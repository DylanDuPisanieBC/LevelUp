import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import LoadingModal from "../components/LoadingModal";
import Popup from "../components/Popup";
import { useState } from "react";
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom';

import '../App.css';

const UpdateGraduate = () => {

    const { id } = useParams();

    const apiURL = 'http://localhost:5082/api/graduates/'

    const[loading, setLoading] = useState(false);
    const[canClick, setCanClick] = useState(false);
    const[buttonEnabled, setButtonEnabled] = useState(true);
    const[buttonClicked, setButtonClicked] = useState(false);
    const[popup, setPopup] = useState(false);
    const[popupMessage, setPopupMessage] = useState("Test")
    const[popupColor, setPopupColor] = useState("green")
    const[graduate, setGraduate] = useState({
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

    function handleValueChange(e){
        const { name, value } = e.target;
        
        setGraduate(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {

        const fetchGraduateData = async () => {

            setLoading(true); 
  
          await GetGraduateData();
  
            setLoading(false); 
          };
      
          fetchGraduateData();

    }, []);

    useEffect(() => {
        checkValidation();
        console.log(graduate);
    }, [graduate])

    async function GetGraduateData(){
        setLoading(true);
        const apiEndpoint = apiURL + `get/${id}`;
        try
        {
            const result = await fetch(apiEndpoint);
            if(result.ok)
            {
                const data = await result.json();
                setGraduate(data);

            }else
            {
                console.log("something went wrong");
                setLoading(false);
                setPopupColor('orange');
                setPopupMessage('Failed to get graduate data');
                setPopup(true);
                return null;
            }

            setLoading(false);

        }catch(err)
        {
            console.log(err.message);
            setLoading(false);
            setPopupColor('red');
            setPopupMessage('Failed to get graduate data:' + err.message);
            setPopup(true);
            return null;
        }

    };

    async function editGraduate(e) {
        e.preventDefault();
        setLoading(true);
        console.log(dataValidation);
        setButtonEnabled(false);
        if (!dataValidation.valid) {
            console.log("data validation failed")
            setLoading(false);
            return;
        }

        const apiEndpoint = apiURL + 'edit'
        const json = JSON.stringify(graduate);
        console.log(json);
        try
        {
            const result = await fetch(apiEndpoint, {
                method: 'PUT',
                body: json,
                headers: { "content-type": "application/json"}
            });
            if(result.ok)
            {
                console.log("grad edited");
                await GetGraduateData();
                setPopupColor('green');
                setPopupMessage('Graduate updated successfully');
                setPopup(true);
                setLoading(false);
                setButtonEnabled(true);

            }else
            {
                console.log(result.message);
                setLoading(false);
                setPopupColor('orange');
                setPopupMessage('Failed to update graduate');
                setPopup(true);
                setButtonEnabled(true);
                return null;
            }

        }catch(err)
        {
            console.log(err.message);
            setLoading(false);
            setPopupColor('red');
            setPopupMessage('Failed to update graduate' + err.message);
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
        if (graduate.firstName !== "") {
            setValidation(prevState => ({ ...prevState,  firstName: { ...prevState.firstName, message: "", valid: true }}));
        } else {
            setValidation(prevState => ({ ...prevState, firstName: { ...prevState.firstName, message: "Please enter a name!", valid: false }}));
        }
    }
    
    function checkSurnameValidity() {
        if (graduate.lastName !== "") {
            setValidation(prevState => ({ ...prevState, lastName: { ...prevState.lastName, message: "", valid: true }}));
        } else {
            setValidation(prevState => ({ ...prevState, lastName: { ...prevState.lastName, message: "Please enter a surname!", valid: false }}));
        }
    }
    
    function checkPhoneNumberValidity() {
        if (graduate.phoneNumber === "") {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "", valid: true }}));
        } else if (graduate.phoneNumber.charAt(0) !== "+") {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "Phone number is invalid! Format Example: +27824012002", valid: false }}));
        } else {
            setValidation(prevState => ({ ...prevState, phoneNumber: { ...prevState.phoneNumber, message: "", valid: true }}));
        }
    }
    
    function checkEmailValidity() {
        if (graduate.emailAddress === "") {
            setValidation(prevState => ({ ...prevState, emailAddress: { ...prevState.emailAddress, message: "", valid: true }}));
        } else if (!graduate.emailAddress.includes("@") || !graduate.emailAddress.includes(".")) {
            setValidation(prevState => ({ ...prevState, emailAddress: { ...prevState.emailAddress, message: "Email address is invalid! Format Example: name@email.com", valid: false }}));
        } else {
            setValidation(prevState => ({ ...prevState, emailAddress: { ...prevState.emailAddress, message: "", valid: true }}));
        }
    }
    
    function checkDOBValidity() {
        if (graduate.dateOfBirth === "") {
            setValidation(prevState => ({ ...prevState, dateOfBirth: { ...prevState.dateOfBirth, message: "Please enter a date of birth!", valid: false }}));
        } else if (new Date(graduate.dateOfBirth).getTime() >= Date.now()) {
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
            <div className="w-screen h-[20vh] flex justify-center items-center pl-14 grow">
                <div className="">
                    <motion.h3 className="uppercase text-2xl text-white font-[400]" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}>Level Up 2024</motion.h3>
                    <motion.h1 className="uppercase text-7xl text-white font-bold" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}>Update Graduate</motion.h1>
                </div>
                <div className="flex grow flex-col gap-1 h-[30%] pl-20 mt-10">
                    <motion.div className="bg-blue grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1 }} />
                    <motion.div className="bg-green grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1.1 }} />
                    <motion.div className="bg-orange grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }} />
                    <motion.div className="bg-red grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1.3 }} />
                </div>
            </div>

            <section className="md:px-12 px-4 mt-6">
                <form className="grid grid-cols-2 gap-x-40 gap-y-14">
                    <div className="flex flex-col">
                        <label htmlFor="Name" className="text-orange text-md">Name</label>
                        <input id="Name" name="firstName" type="Text" value={graduate && graduate.firstName} onChange={handleValueChange} className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.firstName.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.firstName.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col col-start-2 col-end-2">
                        <label htmlFor="Surname" className="text-orange text-md">Surname</label>
                        <input id="Surname" name="lastName" type="Text" value={graduate && graduate.lastName} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.lastName.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.lastName.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="PhoneNumber" className="text-orange text-md">Phone Number</label>
                        <input id="PhoneNumber" name="phoneNumber" type="tel" value={graduate && graduate.phoneNumber} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.phoneNumber.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.phoneNumber.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col col-start-2 col-end-2">
                        <label htmlFor="EmailAddress" className="text-orange text-md">Email Address</label>
                        <input id="EmailAddress" name="emailAddress" type="email" value={graduate && graduate.emailAddress} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.emailAddress.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.emailAddress.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="DateOfBirth" className="text-orange text-md">Date Of Birth</label>
                        <input id="DateOfBirth" name="dateOfBirth" type="date" value={graduate && graduate.dateOfBirth} onChange={handleValueChange}  className="bg-black border-b border-white border-1 caret-white text-white text-2xl mt-2 focus:outline-none"></input>
                        {buttonClicked ? dataValidation.dateOfBirth.message !== "" ?  <label htmlFor="Name" className="text-red text-md mt-3">{dataValidation.dateOfBirth.message}</label> : <></> : <></>}
                    </div>
                    <div className="flex flex-col col-start-2 col-end-2 justify-center items-end">
                        <motion.button 
                            className="bg-red w-6/12 text-white p-1 rounded-full micro-5 text-[2vw] flex justify-center items-center pl-8 pr-8 uppercase"
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
                            onClick={(e)=>{ editGraduate(e); setButtonClicked(true);}}
                            disabled={!buttonEnabled}>
                            Update Graduate
                            <img src="/assets/icons/rocket_white.webp" className=" w-[3vw] ml-3" />
                        </motion.button>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default UpdateGraduate;
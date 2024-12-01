import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import LoadingModal from "../components/LoadingModal";
import Popup from "../components/Popup";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { motion } from 'framer-motion'

import '../App.css';

const ViewGraduate = () => {

    const { id } = useParams();

    const apiURL = 'http://localhost:5082/api/graduates/'

    const[graduate, setGraduate] = useState();
    const[loading, setLoading] = useState(false);
    const[popup, setPopup] = useState(false);
    const[popupMessage, setPopupMessage] = useState("Test")
    const[popupColor, setPopupColor] = useState("green")

    const slideInRightVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: { scaleX: 1, opacity: 1 }, 
    };

    const slideInLeftVariants = {
        hidden: { x: "-100vw", opacity: 0 },
        visible: { x: 0, opacity: 1 }, 
    };

    useEffect(() => {

        const fetchGraduateData = async () => {

            setLoading(true); 
  
          await GetGraduateData();
  
            setLoading(false); 
          };
      
          fetchGraduateData();

    }, []);

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
                console.log(data);
                setLoading(false);

            }else
            {
                console.log("something went wrong");
                setLoading(false);
                setPopupColor('orange');
                setPopupMessage('Failed to get graduate data');
                setPopup(true);
                return null;
            }

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

    return (
        <div>
            <Navbar />
            {loading ? <LoadingModal/> : <></>}
            {popup && <Popup  message={popupMessage} color={popupColor} setPopupState={setPopup}/>}
            <div className="w-screen h-[20vh] flex justify-center items-center pl-14 grow">
                <div className="">
                    <motion.h3 className="uppercase text-2xl text-white font-[400]" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}>Level Up 2024</motion.h3>
                    <motion.h1 className="uppercase text-7xl text-white font-bold" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}>View Graduate Details</motion.h1>
                </div>
                <div className="flex grow flex-col gap-1 h-[30%] pl-20 mt-10">
                    <motion.div className="bg-blue grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1 }} />
                    <motion.div className="bg-green grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1.1 }} />
                    <motion.div className="bg-orange grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }} />
                    <motion.div className="bg-red grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 1.3 }} />
                </div>
            </div>


            <section className="md:px-12 px-4 mt-6 ">

            <div className="flex bg-white p-4 rounded-xl">
                <h2 className="uppercase text-lg text-black font-bold mr-2">{graduate && graduate.firstName}</h2>
                <h2 className="uppercase text-lg text-black font-normal">{graduate && graduate.lastName}</h2>
            </div>

            <div className="text-white mt-10">
                <div className="flex border-b border-gray-700">
                    <div className="flex flex-col flex-none w-[20vw] justify-between my-6 border-r border-gray-700">
                        <div className="text-orange text-sm text-orange">Phone Number</div>
                        <div className={graduate && graduate.phoneNumber !== "" ? "text-2xl text-white" : "text-2xl text-red"}>{graduate && graduate.phoneNumber !== "" ? graduate.phoneNumber : "Field Empty"}</div>
                    </div>
                    <div class="flex flex-col flex-none w-[30vw] justify-between my-6 border-r border-gray-700 ml-20">
                        <div className="text-orange-400 text-sm text-orange">Email Address</div>
                        <div className={graduate && graduate.emailAddress !== "" ? "text-2xl text-white" : "text-2xl text-red"}>{graduate && graduate.emailAddress !== "" ? graduate.emailAddress : "Field Empty"}</div>
                    </div>
                    <div className="flex flex-col flex-1 w-[10vw] justify-between my-6 ml-20">
                        <div className="text-orange-400 text-sm text-orange">Age</div>
                        <div className="text-2xl">{graduate && graduate.age}</div>
                    </div>
                </div>

                <div className="flex">

                    <div className="flex flex-col flex-none w-[20vw] justify-between my-6 border-r border-gray-700">
                        <div className="text-orange-400 text-sm text-orange">Date Created</div>
                        <div className="text-2xl">{graduate && new Date(graduate.dateCreated).toLocaleDateString("en-US").replace(/\//g, '.')}</div>
                    </div>
                    <div className="flex flex-col flex-1 w-[10vw] justify-between my-6 ml-20">
                        <div className="text-orange-400 text-sm text-orange">Last Edited</div>
                        <div className={graduate && graduate.dateEdited !== null ? "text-2xl text-white" : "text-2xl text-red"}>{graduate && graduate.dateEdited !== null ? new Date(graduate.dateEdited).toLocaleDateString("en-US").replace(/\//g, '.') : "Field Empty"}</div>
                    </div>

                </div>      
            </div>

            </section>
        </div>
    )
}

export default ViewGraduate;
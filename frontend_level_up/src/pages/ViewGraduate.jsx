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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const[slideAnim, setSlideAnim] = useState(false);

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
            <div className="w-screen h-[10vh] md:h-[20vh] flex justify-center items-center pl-5 md:pl-14 grow ">
                <div className="mt-5 md: mt-10">
                    <motion.h3 className="uppercase text-[3vw] md:text-2xl text-white font-[400]" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}>Level Up 2024</motion.h3>
                    <motion.h1 className="uppercase text-2xl md:text-7xl text-white font-bold" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}>{windowWidth < 768 ? "View Graduate" : "View Graduate Details"}</motion.h1>
                </div>
                <div className="flex grow flex-col gap-0.5 md:gap-1 h-[35%] md:h-[30%] pl-5 md:pl-20 mt-10 md:mt-10">
                    <motion.div className="bg-blue grow z-10 grow" variants={ slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.3 }} whileHover={{ translateX: "200px"}} />
                    <motion.div className="bg-green grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.4 }} whileHover={{ translateX: "200px"}} />
                    <motion.div className="bg-orange grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.5 }} whileHover={{ translateX: "200px"}} />
                    <motion.div className="bg-red grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" onAnimationComplete={()=>setSlideAnim(true)} transition={slideAnim ? { duration: 0.3, ease: "easeOut", delay: 0 }:{ duration: 0.8, ease: "easeOut", delay: 0.6 }} whileHover={{ translateX: "200px"}} />
                </div>
            </div>


            <section className="w-[100%] md:px-12 px-4 mt-6">

                <div className="flex bg-white p-4 rounded-xl">
                    <h2 className="uppercase text-sm md:text-lg text-black font-bold mr-2">{graduate && graduate.firstName}</h2>
                    <h2 className="uppercase text-sm md:text-lg text-black font-normal">{graduate && graduate.lastName}</h2>
                </div>

                <section className="grid grid-cols-2 md:grid-cols-3 grid-rows-[auto_20px_auto_20px_auto] md:grid-rows-[auto_20px_auto] text-white">

                    <div className="flex flex-col flex-none w-[40vw] md:w-[20vw] justify-between my-3 md:my-6 border-r border-white-700 col-start-1 col-end-1">
                            <div className="text-orange text-[12px] md:text-sm text-orange">Phone Number</div>
                            <div className={graduate && graduate.phoneNumber !== "" ? "text-md md:text-2xl text-white" : "text-md md:text-2xl text-red"}>{graduate && graduate.phoneNumber !== "" ? graduate.phoneNumber : "Field Empty"}</div>
                    </div>

                    <div class="flex flex-col flex-none w-[60vw] md:w-[30vw] justify-between my-3 md:my-6 md:border-r border-white-700 md:ml-20 col-start-1 col-end-2 row-start-3 md:row-start-1 md:col-start-2 md:col-end-2">
                        <div className="text-orange-400 text-[12px] md:text-sm text-orange">Email Address</div>
                        <div className={graduate && graduate.emailAddress !== "" ? "text-md md:text-2xltext-white" : "text-md md:text-2xl text-red"}>{graduate && graduate.emailAddress !== "" ? graduate.emailAddress : "Field Empty"}</div>
                    </div>

                    <div className="flex flex-col flex-1 w-[10vw] justify-between my-3 md:my-6 ml-5 md:ml-20 row-start-1 col-start-2 col-end-2 md:col-start-3 md:col-end-3">
                            <div className="text-orange-400 text-[12px] md:text-sm md:text-2xl text-orange">Age</div>
                            <div className="text-2xl">{graduate && graduate.age}</div>
                    </div>

                    <div className="w-[100%] h-[50%] border-b border-1 border-white col-span-3 row-start-2"></div>
                    <div className="w-[100%] h-[50%] border-b border-1 border-white col-span-3 row-start-4 md:hidden"></div>

                    <div className="row-start-5 col-span-2 md:row-start-3 flex flex">
                        <div className="flex flex-col flex-none flex-none w-[30vw] md:w-[20vw] justify-between my-3 md:my-6 border-r border-white-700">
                            <div className="text-orange-400 text-[12px] md:text-sm text-orange">Date Created</div>
                            <div className="text-md md:text-2xl">{graduate && new Date(graduate.dateCreated).toLocaleDateString("en-US").replace(/\//g, '.')}</div>
                        </div>
                        <div className="flex flex-col flex-1 flex-none w-[40vw] md:w-[20vw] justify-between my-3 md:my-6 ml-5 md:ml-20">
                            <div className="text-orange-400 text-[12px] md:text-sm text-orange">Last Edited</div>
                            <div className={graduate && graduate.dateEdited !== null ? "text-md md:text-2xl text-white" : "text-md md:text-2xl text-red"}>{graduate && graduate.dateEdited !== null ? new Date(graduate.dateEdited).toLocaleDateString("en-US").replace(/\//g, '.') : "Field Empty"}</div>
                        </div>
                    </div>

                </section>

            </section>
        </div>
    )
}

export default ViewGraduate;
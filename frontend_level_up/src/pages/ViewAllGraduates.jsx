import React from "react";
import Navbar from "../components/navbar";
import GradRow from "../components/gradrow";
import DeleteModal from "../components/DeleteModal";
import LoadingModal from "../components/LoadingModal";
import Popup from "../components/Popup";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

import '../App.css';



const ViewAllGraduates = () => {

    const apiURL = 'http://localhost:5082/api/graduates/'

    const[loading, setLoading] = useState(false);
    const[popup, setPopup] = useState(false);
    const[popupMessage, setPopupMessage] = useState("Test")
    const[popupColor, setPopupColor] = useState("green")
    const[graduates, setGraduates] = useState([]);
    const[currentGraduate, setCurrentGraduate] = useState(null);
    const[deleteModal, setDeleteModal] = useState(false);


    const slideInRightVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: { scaleX: 1, opacity: 1 }, 
    };

    const slideInLeftVariants = {
        hidden: { x: "-100vw", opacity: 0 },
        visible: { x: 0, opacity: 1 }, 
    };

    const fadeInLeftVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }, 
    };

    useEffect(() => {
        const fetchGraduatesData = async () => {

        await LoadGraduatesData();

          
        };
    
        fetchGraduatesData();
      }, []);

    //get all grads data
    async function LoadGraduatesData(){
        setLoading(true); 
        const apiEndpoint = apiURL + 'get';
        try
        {
            const result = await fetch(apiEndpoint);
            if(result.ok)
            {
                const data = await result.json();
                setGraduates(data);
                console.log(data);

            }else
            {
                console.log("something went wrong");
                setLoading(false);
                setPopupColor('red');
                setPopupMessage('Failed to get graduates');
                setPopup(true);
                return null;
            }

            setLoading(false);

        }catch(err)
        {
            console.log(err.message);
            setLoading(false);
            setPopupColor('red');
            setPopupMessage('Failed to get graduates:' + err.message);
            setPopup(true);
            return null;
        }
        
    }

    function toggleShowModal(){
        setDeleteModal(!deleteModal);
    }

    //delete grad
    async function DeleteGraduate(){
        if (!currentGraduate || !currentGraduate.graduateId) {
            console.log(currentGraduate);
            console.error('Current graduate is not set');
            setPopupColor('orange');
            setPopupMessage('Failed to delete graduate: current graduate is not set.');
            setPopup(true);
            return;
        }

        setLoading(true); 
        const apiEndpoint = apiURL + `delete/${currentGraduate.graduateId}`;
        try
        {
            const result = await fetch(apiEndpoint, { method: 'DELETE' });
            if(result.ok)
            {
                setLoading(false); 
                toggleShowModal();
                setPopupColor('green');
                setPopupMessage('Graduate Deleted');
                setPopup(true);
                await LoadGraduatesData();
                return;
            }else
            {
                console.log("something went wrong");
                setLoading(false); 
                toggleShowModal();
                setPopupColor('orange');
                setPopupMessage('Failed to delete graduate.');
                setPopup(true);
                return null;
            }

            

        }catch(err)
        {
            console.log(err.message);
            setLoading(false); 
            toggleShowModal();
            setPopupColor('red');
            setPopupMessage('Failed to delete graduate:' + err.message);
            setPopup(true);
            return null;
        }
    }

    function setCurrentGraduteFunc(graduate){
        setCurrentGraduate(graduate);
    }

    return (
        <div>
            <Navbar />
            {loading ? <LoadingModal/> : <></>}
            {popup && <Popup  message={popupMessage} color={popupColor} setPopupState={setPopup}/>}
            {deleteModal ? <DeleteModal graduate={currentGraduate} cancelModal={toggleShowModal} deleteGraduate={DeleteGraduate}/> : null}
            
            <div className="w-screen h-[20vh] flex justify-center items-center pl-14 grow">
                <div className="">
                    <motion.h3 className="uppercase text-2xl text-white font-[400]" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}>Level Up 2024</motion.h3>
                    <motion.h1 className="uppercase text-7xl text-white font-bold" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}>Graduate List</motion.h1>
                </div>
                <div className="flex grow flex-col gap-1 h-[30%] pl-20 mt-10">
                    <motion.div className="bg-blue grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.8, ease: "easeOut", delay: 1 }} />
                    <motion.div className="bg-green grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }} />
                    <motion.div className="bg-orange grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }} />
                    <motion.div className="bg-red grow z-10 grow" variants={slideInRightVariants} initial="hidden" animate="visible" transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }} />
                </div>
            </div>


            <section className="md:px-12 px-4 mt-6">
                <table className="w-full border border-white md:rounded-t-xl rounded-t-lg overflow-hidden">
                    <thead className="bg-white uppercase micro-5 text-3xl">
                        <tr>
                            <th className="md:rounded-s-xl rounded-s-lg md:py-2 py-1 md:px-8 px-4">
                                <div className="relative flex justify-start items-center">
                                    Full Name
                                    <img src="../assets/icons/rocket_black.webp" className="absolute right-0 h-2/3 md:block hidden" />
                                </div>
                            </th>
                            <th className="md:py-2 py-1 md:px-8 px-4 md:block hidden">
                                <div className="relative flex justify-start items-center">
                                    Contact Details
                                    <img src="../assets/icons/rocket_black.webp" className="absolute right-0 h-2/3" />
                                </div>
                            </th>
                            <th className="md:rounded-e-xl rounded-e-lg md:py-2 py-1 md:px-8 px-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {
                            graduates.length > 0 
                            ? 
                            graduates.map((grad, index) => {
                                return <GradRow graduate={grad} key={grad.graduateId} index={index} showDeleteModal={toggleShowModal} setCurrentGrad={setCurrentGraduteFunc}/>
                            })
                            :
                            <tr className="h-[40vh] items-center justify-center">
                                <td colSpan="3" className="text-center">
                                    <motion.h1
                                     className="text-white text-4xl"
                                     variants={fadeInLeftVariants}
                                     initial="hidden"
                                     animate="visible"
                                     transition={{delay: 1, duration: 2}}
                                     >
                                        No 2024 Graduates   
                                        <motion.h1
                                        variants={fadeInLeftVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{delay: 3, duration: 4}}
                                        >
                                        yet...
                                        </motion.h1>
                                    </motion.h1>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default ViewAllGraduates;
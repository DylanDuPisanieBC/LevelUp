import {motion} from 'framer-motion'
import { useState } from 'react';

export default function DeleteModal({graduate, cancelModal, deleteGraduate}){

    const FadeInVariants = {
        hidden: { opacity: 0},
        visible: { opacity: 1}
    };
    
    return (

        <motion.div 
        className="w-screen h-screen bg-[#080808e1] absolute top-0 left-0 z-50 flex items-center justify-center"
        variants={FadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{duration:0.5, ease: "easeOut"}}
        >
            <div className="relative w-[80vw] h-[80vw] md:w-[25vw] md:h-[25vw] bg-[#E3F0D3] flex flex-col justify-center items-center">
                <h3 className="uppercase micro-5 text-3xl">DELETE GRADUATE</h3>
                <h1 className="uppercase text-6xl"><b>DELETE</b></h1>
                <h2 className="text-2xl md:text-4xl mt-1 md:mt-2"><b>{graduate.firstName}</b> {graduate.lastName}</h2>
                <img
                    src="assets/illustrations/dude.webp"
                    className="absolute w-[20vw] right-[-15.5vw] bottom-[-12vw] scale-x-[-1] z-10 md:block hidden"
                    alt="Dude"
                />
                <motion.button
                    className=" w-[50vw] h-[12vw] md:w-[13vw] md:h-[3.5vw] micro-5 text-4xl md:text-5xl color-red text-red rounded-full border-2 md:border-4 border-red p-1 mt-10 md:mt-20"
                    whileHover={{
                        scale: 1.1, 
                        transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 17 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {deleteGraduate()}}
                 >
                DELETE
                </motion.button>
                <motion.button
                    className="w-[50vw] h-[12vw] md:w-[13vw] md:h-[3.5vw] micro-5 text-4xl md:text-5xl color-green text-green rounded-full border-2 md:border-4 border-green p-1 mb-5 mt-5 md:mt-10"
                    whileHover={{
                        scale: 1.1, 
                        transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 17 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={()=>{cancelModal()}}
                >
                    CANCEL
                </motion.button>
            </div>
        </motion.div>



    );
}
import React, { useState } from "react";
import { motion, transform } from 'framer-motion'

import '../App.css';
import { Link } from "react-router-dom";

const Welcome = () => {

    const slideInLeftVariants = {
        hidden: { x: "-100vw", opacity: 0 },
        visible: { x: 0, opacity: 1 }, 
      };
    
    const FadeInVariants = {
        hidden: { opacity: 0},
        visible: { opacity: 1}
    };

    const [canClick, setCanClick] = useState(false);
    const [float, setFloat] = useState(false);
    
    return (
        <div className=" relative bg-cover bg-center space-background h-screen w-screen flex items-center flex-col">

            <motion.img src="/assets/logos/softserve-logo.webp" alt="softserve logo" className="w-52 mt-10" variants={FadeInVariants} initial="hidden" animate="visible" transition={{ duration: 1, ease: "easeOut", delay:0.2}}/>

            <div className="absolute top-[20vh] left-20 w-[50vw]">
                <motion.img src="/assets/logos/time-to-level-up.webp" alt="softserve logo" className="w-4/4" onAnimationComplete={() => setFloat(true)} variants={FadeInVariants} initial={float ? {opacity: 1} :"hidden"} animate={float ? { x: [0, 5, -5, 0], rotate: [0, 2, -2, 0]} : "visible"} transition={float ? {duration: 8,  repeat: Infinity, ease: "easeInOut"} : { duration: 1, ease: "easeOut", delay:1.3} }/>
                <Link to="viewall">
                    <motion.button 
                        className="bg-red w-2/5 text-white p-1 rounded-full micro-5 text-[2vw] flex justify-center items-center pl-8 pr-8"
                        variants={FadeInVariants}
                        initial="hidden"
                        animate="visible"
                        transition={canClick ? {} : { duration: 0.5, ease: "easeOut", delay: 4 }}
                        onAnimationComplete={() => setCanClick(true)}
                        whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400, damping: 10, delay: 0 },
                        }}
                        whileTap={{ scale: 0.95 }}>
                        View Graduates
                        <img src="/assets/icons/rocket_white.webp" className=" w-[3vw] ml-3" />
                    </motion.button>
                </Link>
                

            </div>
            
            <motion.img src="/assets/illustrations/cover.webp" className="absolute bottom-0 right-0 w-5/12 z-10" variants={FadeInVariants} initial="hidden" animate="visible" transition={{ duration: 1, ease: "easeOut" , delay:2.5}}/>

            <div className="h-[6vh] flex flex-col w-[100vw] gap-1 absolute bottom-16">
                <motion.div className="bg-blue grow z-0" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay:3}}/>
                <motion.div className="bg-green grow z-0" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay:3.1 }}/>
                <motion.div className="bg-orange grow z-0" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay:3.2}}/>
                <motion.div className="bg-red grow z-0" variants={slideInLeftVariants} initial="hidden" animate="visible" transition={{ duration: 0.4, ease: "easeOut", delay:3.3}}/>
            </div>

        </div>
    )
}

export default Welcome;

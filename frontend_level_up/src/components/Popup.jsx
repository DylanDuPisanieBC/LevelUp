import { useEffect} from 'react';
import { motion } from 'framer-motion'

export default function Popup({message, color, setPopupState}){

    
    useEffect(() => {
        const timer = setTimeout(() => {
          setPopupState(false);  
        }, timerTime);
    
        return () => clearTimeout(timer);  
      }, [setPopupState]);

      const FadeInVariants = {
        hidden: { opacity: 0},
        visible: { opacity: 1}
    };

    const colorToUse = color === 'red' ? "relative w-[25vw] h-[10vw] bg-red flex flex-col justify-center items-center text-center rounded-[2vw] shadow-sm"
    : 
    color === 'green' ? "relative w-[25vw] h-[10vw] bg-green flex flex-col justify-center items-center text-center rounded-[2vw] shadow-sm"
    :
    "relative w-[25vw] h-[10vw] bg-orange flex flex-col justify-center items-center text-center rounded-[2vw] shadow-sm"

    const timerTime = color === 'red' ? 3000
    : 
    color === 'green' ? 1500
    :
    2500
    
    return (

        <motion.div
         className="w-screen h-screen bg-transparent absolute top-0 left-0 z-50 flex items-center justify-center"
         variants={FadeInVariants}
         initial="hidden"
         animate="visible"
         exit="hidden"
         transition={{duration:0.6, ease: "easeOut"}}
         >
            <div className={colorToUse}>
                <h1 className="text-white text-2xl font-light">{message}</h1>
            </div>
        </motion.div>



    );
}
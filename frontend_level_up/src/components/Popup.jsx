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

    const colorToUse = color === 'red' ? "relative w-[70vw] h-[50vw] p-10 md:w-[25vw] md:h-[10vw] bg-red flex flex-col justify-center items-center text-center rounded-[2vw] drop-shadow-xl [text-shadow:_0px_5px_5px_rgb(0_0_0_/_30%)]"
    : 
    color === 'green' ? "relative w-[70vw] h-[50vw] p-10 md:w-[25vw] md:h-[10vw] bg-green flex flex-col justify-center items-center text-center rounded-[2vw] drop-shadow-xl [text-shadow:_0px_5px_5px_rgb(0_0_0_/_30%)]"
    :
    "relative w-[70vw] h-[50vw] p-10 md:w-[25vw] md:h-[10vw] bg-orange flex flex-col justify-center items-center text-center rounded-[2vw] drop-shadow-xl [text-shadow:_0px_5px_5px_rgb(0_0_0_/_30%)]"

    const timerTime = color === 'red' ? 2000
    : 
    color === 'green' ? 2000
    :
    2000
    
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
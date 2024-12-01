import {motion} from 'framer-motion'

export default function LoadingModal(){

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
        transition={{duration:0.2, ease: "easeOut"}}
        >
            <div className="relative w-[25vw] h-[25vw] bg-transparent flex flex-col justify-center items-center">
                <div class="loader"></div>
                <h1 className="text-white text-2xl font-light mt-10">Loading you data...</h1>
            </div>
        </motion.div>



    );
}
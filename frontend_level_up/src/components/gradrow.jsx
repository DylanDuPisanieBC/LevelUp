import { useState } from "react";
import GradActionButton from "./GradActionButton";
import { motion } from 'framer-motion'

export default function Gradrow({graduate, index, showDeleteModal, setCurrentGrad}){

    const whiteText = "md:py-4 py-2 md:px-8 px-4 text-left";
    const redText = "md:py-4 py-2 md:px-8 px-4 text-red text-left";
    const contactDetails = graduate.emailAddress !== "" ? graduate.emailAddress : graduate.phoneNumber !== "" ? graduate.phoneNumber : "Field Empty";
    const gradRowVariants = {
        hidden: { y: "100vh", opacity: 0 },
        visible: { y: 0, opacity: 1 }, 
      };
    const [switchDelay, setSwitchDelay] = useState(false);
    

    return(
        <motion.tr
            whileHover={{
                backgroundColor: '#171717',
                transition: { duration: 0.2 },
            }}
            variants={gradRowVariants}
            initial="hidden"
            animate="visible"
            transition={switchDelay ? {} : { duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            onAnimationComplete={() => setSwitchDelay(true)}
        >
            <td className="md:py-4 py-2 md:px-8 px-4 text-left">{`${graduate.firstName} ${graduate.lastName}`}</td>
            <td className={contactDetails === "Field Empty" ? redText : whiteText}>{contactDetails}</td>
            <td className="md:py-4 py-2 text-center">
                <div className="flex place-content-evenly">
                    <GradActionButton graduate={graduate} buttonType={"view"} showDeleteModal={showDeleteModal} setCurrentGrad={setCurrentGrad}/>
                    <GradActionButton graduate={graduate} buttonType={"update"} showDeleteModal={showDeleteModal} setCurrentGrad={setCurrentGrad}/>
                    <GradActionButton graduate={graduate} buttonType={"delete"} showDeleteModal={showDeleteModal} setCurrentGrad={setCurrentGrad}/>
                </div>                
            </td>
        </motion.tr>

    )
}
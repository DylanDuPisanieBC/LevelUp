import { useState } from "react";
import GradActionButton from "./GradActionButton";
import { motion } from 'framer-motion'

export default function Gradrow({graduate, index, showDeleteModal, setCurrentGrad}){

    const whiteText = "md:py-4 py-2 md:px-8 px-4 text-left hidden md:block";
    const redText = "md:py-4 py-2 md:px-8 px-4 text-red text-left hidden md:block";
    const contactDetails = graduate.emailAddress !== "" ? graduate.emailAddress : graduate.phoneNumber !== "" ? graduate.phoneNumber : "Field Empty";
    const gradRowVariants = {
        hidden: { y: "100vh", opacity: 0 },
        visible: { y: 0, opacity: 1 }, 
      };
    const [switchDelay, setSwitchDelay] = useState(false);
    const noBorderTop = "border-[1px] border-t-0 border-x-0"
    const noBorderBottom = "border-[1px] border-b-0 border-x-0"
    

    return(
        <motion.tr
            className={index === 0 ? noBorderTop : noBorderBottom}
            whileHover={{
                backgroundColor: '#171717',
                transition: { duration: 0.2 },
            }}
            variants={gradRowVariants}
            initial="hidden"
            animate="visible"
            transition={switchDelay ? {} : { duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            onAnimationComplete={() => setSwitchDelay(true)
            }
        >
            <td className="md:p-l-4 p-l-2 md:px-8 px-4 text-left flex mt-7 md:table-cell">
                <b>
                {graduate.firstName}
                </b>
                 {" " + graduate.lastName}
            </td>
            <td className={contactDetails === "Field Empty" ? redText : whiteText}>{contactDetails}</td>
            <td className="md:py-4 py-2 text-center">
                <div className="flex flex-col md:p-0 md:flex-row place-content-evenly gap-5 pl-5 py-5">
                    <GradActionButton graduate={graduate} buttonType={"view"} showDeleteModal={showDeleteModal} setCurrentGrad={setCurrentGrad}/>
                    <GradActionButton graduate={graduate} buttonType={"update"} showDeleteModal={showDeleteModal} setCurrentGrad={setCurrentGrad}/>
                    <GradActionButton graduate={graduate} buttonType={"delete"} showDeleteModal={showDeleteModal} setCurrentGrad={setCurrentGrad}/>
                </div>                
            </td>
        </motion.tr>

    )
}
import GradActionButton from "./GradActionButton";
import { motion } from 'framer-motion'

export default function gradrow({graduate}){

    const whiteText = "md:py-4 py-2 md:px-8 px-4 text-left";
    const redText = "md:py-4 py-2 md:px-8 px-4 text-red text-left";
    const contactDetails = graduate.emailAddress !== "" ? graduate.emailAddress : graduate.phoneNumber !== "" ? graduate.phoneNumber : "Field Empty";

    return(
        <motion.tr
            whileHover={{
                backgroundColor: '#171717',
                transition: { duration: 0.2 },
            }}
        >
            <td className="md:py-4 py-2 md:px-8 px-4 text-left">{`${graduate.firstName} ${graduate.lastName}`}</td>
            <td className={contactDetails === "Field Empty" ? redText : whiteText}>{contactDetails}</td>
            <td className="md:py-4 py-2 text-center">
                <div className="flex place-content-evenly">
                    <GradActionButton gradID={graduate.graduateID} buttonType={"view"} />
                    <GradActionButton gradID={graduate.graduateID} buttonType={"update"} />
                    <GradActionButton gradID={graduate.graduateID} buttonType={"delete"} />
                </div>                
            </td>
        </motion.tr>

    )
}
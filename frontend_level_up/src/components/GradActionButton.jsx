import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

export default function GradActionButton({graduate, buttonType, showDeleteModal, setCurrentGrad}){


    const viewStyle = "micro-5 h-9 text-lg md:text-2xl md:h-12 w-36 md:w-40 color-orange text-orange rounded-full border-2 border-orange p-1";
    const updateStyle = "micro-5 h-9 text-lg md:text-2xl md:h-12 w-36 md:w-40 color-green text-green rounded-full border-2 border-green p-1";
    const deleteStyle = "micro-5 h-9 text-lg md:text-2xl md:h-12 w-36 md:w-40 color-red text-red rounded-full border-2 border-red p-1";

    const styleUsed = buttonType.toLowerCase() === "view" ? viewStyle : buttonType.toLowerCase() === "update" ? updateStyle : deleteStyle;
    const buttonText = buttonType.toLowerCase() === "view" ? "VIEW MODE" : buttonType.toLowerCase() === "update" ? "UPDATE" : "DELETE";

    const navigate = useNavigate();

    return (
        <motion.button
            className={styleUsed}
            initial={{ background: "transparent" }}
            whileHover={{
                scale: 1.1, // Springy scaling
                transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
                if (buttonType.toLowerCase() === "view") {
                    navigate(`/view/${graduate.graduateId}`);
                } else if (buttonType.toLowerCase() === "update") {
                    navigate(`/update/${graduate.graduateId}`);
                } else if (buttonType.toLowerCase() === "delete") {
                    setCurrentGrad(graduate); 
                    showDeleteModal(); 
                }
            }}

        >
            {buttonText}
        </motion.button>
            
    );
}
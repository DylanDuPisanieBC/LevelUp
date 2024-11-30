import { motion } from 'framer-motion'

export default function GradActionButton({gradID, buttonType}){


    const viewStyle = "micro5 w-40 color-orange text-orange rounded-full border-2 border-orange p-2";
    const updateStyle = "micro5 w-40 color-green text-green rounded-full border-2 border-green p-1";
    const deleteStyle = "micro5 w-40 color-red text-red rounded-full border-2 border-red p-1";

    const styleUsed = buttonType.toLowerCase() === "view" ? viewStyle : buttonType.toLowerCase() === "update" ? updateStyle : deleteStyle;
    const buttonText = buttonType.toLowerCase() === "view" ? "VIEW MODE" : buttonType.toLowerCase() === "update" ? "UPDATE" : "DELETE";

    return (
        <motion.button
            className={styleUsed}
            initial={{ background: "transparent" }}
            whileHover={{
                scale: 1.1, // Springy scaling
                transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.95 }}

        >
            {buttonText}
        </motion.button>
            
    );
}
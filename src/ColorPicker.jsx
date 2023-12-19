import { motion } from "framer-motion"
import { memo } from "react"

const ColorPicker = memo(function Picker({ position, selectedColor, colors, choiceCallback }) {
    const colorVariants = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    }

    const colorPickerVariants = {
        visible: {
            opacity: 1, x: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: .025
            }
        },
        hidden: {
            opacity: 0, x: -100,
            transition: {
                when: "afterChildren",
                staggerChildren: .025
            }
        }
    }

    return <motion.div variants={colorPickerVariants} initial="hidden" animate="visible"
        className="color"
        style={{ position: "absolute", left: `calc(50% + ${position[0]}px)`, bottom: `calc(50% + ${position[1]}px)` }}>
        <motion.div variants={colorVariants}
            className="color-selected"
            style={{ backgroundColor: colors[selectedColor] }}></motion.div>
        <motion.ul variants={colorPickerVariants} initial="hidden" animate="visible" className="color-choices">
            {colors.map((x, i) =>
                <motion.li variants={colorVariants} key={i} >
                    <button onClick={() => choiceCallback(i)} style={{ backgroundColor: x }}>
                        <span>{x}</span>
                    </button>
                </motion.li>
            )}
        </motion.ul>
    </motion.div>
})

export default ColorPicker
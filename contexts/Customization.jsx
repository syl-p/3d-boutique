import { createContext, useContext, useState } from "react";
import { Shirt } from "../src/Shirt_baked_2";
import { Shoe } from "../src/Shoe";
import { BaseballCap } from "../src/BaseballCap";

const CustomizationContext = createContext({})
const mainColorsPalette = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'];

const products = [
    {
        component: <Shirt />,
        title: "T-shirt 1",
        buzzline: "Pour avoir le style",
        description: "Text de presentation du produit",
        colorsPositions: [[100, 100]],
        price: 13.5
    },
    {
        component: <Shoe />,
        title: "Shoes",
        buzzline: "Pour courrir vite",
        description: "Text de presentation du produit",
        colorsPositions: [[0, 0], [-100, -100]],
        price: 35.9
    },
    {
        component: <BaseballCap />,
        title: "Casquette",
        buzzline: "Pour se protéger du soleil",
        description: "Text de presentation du produit",
        colorsPositions: [[0, 0], [-100, -140]],
        price: 12.9
    }
]

export const CustomizationProvider = (props) => {
    const [mainColor, setMainColor] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedColors, setSelectedColors] = useState([0])
    const [cart, setCart] = useState({})

    return <CustomizationContext.Provider value={{
        products,
        mainColorsPalette,
        mainColor, setMainColor,
        selectedColors, setSelectedColors,
        selectedProduct, setSelectedProduct,
        cart, setCart
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext)
    return context
}
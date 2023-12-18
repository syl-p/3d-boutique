import { createContext, useContext, useState } from "react";
import { Shirt } from "../src/Shirt_baked_2";
import { Shoe } from "../src/Shoe";

const CustomizationContext = createContext({})
const mainColorsPalette = ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'];

const products = [
    {
        component: <Shirt />,
        title: "T-shirt 1",
        buzzline: "Pour avoir le style",
        description: "Text de presentation du produit",
        colorsPositions: [[100, 100]]
    },
    {
        component: <Shoe />,
        title: "Shoes",
        buzzline: "Pour courrir vite",
        description: "Text de presentation du produit",
        colorsPositions: [[0, 0], [-100, -100]]
    },
    {
        component: <Shoe />,
        title: "Shoes",
        buzzline: "Pour courrir vite",
        description: "Text de presentation du produit",
        colorsPositions: [[0, 0], [-100, -100]]
    }
]

export const CustomizationProvider = (props) => {
    const [mainColor, setMainColor] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState(null)

    return <CustomizationContext.Provider value={{
        products,
        mainColorsPalette,
        mainColor, setMainColor,
        selectedProduct, setSelectedProduct
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext)
    return context
}
import { Suspense, memo, useEffect, useRef } from 'react'
import './App.css'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AccumulativeShadows, Center, Environment, RandomizedLight, Scroll, ScrollControls, Text } from '@react-three/drei';
import { easing } from 'maath';
import { CustomizationProvider, useCustomization } from '../contexts/Customization';
import gsap from 'gsap';
import * as THREE from "three"
import ColorPicker from './ColorPicker';
import { AnimatePresence, motion } from "framer-motion"
import Header from './Header';

const BackdropMemo = memo(function Backdrop() {
    const { mainColorsPalette, selectedColors, selectedProduct } = useCustomization()
    const shadows = useRef()
    useEffect(() => {
        if (shadows.current) {
            const newColor = new THREE.Color(mainColorsPalette[selectedColors[0]])
            gsap.to(shadows.current.getMesh().material.color, { ...newColor, duration: 1 })
        }
    }, [selectedColors, selectedProduct])

    return <AccumulativeShadows ref={shadows} alphaTest={0.5}
        scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, -0.30]}>
        <RandomizedLight amount={4} radius={9} intensity={0.90} ambient={0.25} position={[5, 3, -10]} />
        <RandomizedLight amount={4} radius={5} intensity={0.70} ambient={0.55} position={[-5, 3, -9]} />
    </AccumulativeShadows>
})

function Rig() {
    useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [Math.sin(-state.pointer.x) * 0.25, state.pointer.y * 0.25, 0.5 + Math.cos(state.pointer.x) * 2.5],
            0.2,
            delta,
        )
        state.camera.lookAt(0, 0, 0)
    })
}

const ProductMemo = memo(function Product(props) {
    return <group  {...props}>
        <Center>
            {props.children}
        </Center>
    </group>
})

function Items() {
    const { height: h } = useThree((state) => state.viewport)
    const { products, selectedProduct, setSelectedProduct, mainColorsPalette, mainColor,
        selectedColors, setSelectedColors, cart, setCart } = useCustomization()

    const wrapVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: { ease: "linear" }
        },
        hidden: {
            opacity: 0,
            x: "-100%",
            transition: { ease: "linear" }
        },
    }

    const btnVariants = {
        visible: {
            opacity: 1, x: 0,
            transition: { ease: "linear" }
        },
        hidden: {
            opacity: 0, x: "-100%",
            transition: { ease: "linear" }
        },
    }

    const ctaVariants = {
        normal: {
            transition: { ease: "linear" }
        },
        solo: {
            x: "-100%",
            transition: { ease: "linear" }
        },
    }

    function selectProductCallback(i) {
        setSelectedProduct(i)
        // setSelectedColors([])
    }

    function chooseColor(i, color) {
        const slColors = [...selectedColors]
        slColors[i] = color
        setSelectedColors(slColors)
    }

    function addToCart(index) {
        const cartUpdated = { ...cart }
        if (!cartUpdated[i]) {
            cartUpdated[i] = 1
        } else {
            cartUpdated[i]++
        }

        setCart(cartUpdated)
    }

    return <>
        <Scroll>
            {
                products.map((x, i) =>
                    <ProductMemo key={i} position-y={-h * i} index={i}>
                        <Suspense>
                            <BackdropMemo />
                            {x.component}
                        </Suspense>
                        <Text scale={0.15} position={[0.25 * (i % 2 == 0 ? -1 : 1), 0.5, -0.15]}>
                            {x.title}
                        </Text>
                        <Text scale={0.08} position={[0.25 * (i % 2 == 0 ? 1 : -1), -0.05, 0.45]}>
                            {x.price} €
                        </Text>
                    </ProductMemo>
                )
            }
        </Scroll>
        <Scroll html style={{ width: '100%' }} className="scroll-html">
            {products.map((x, i) =>
                <section key={i} className="scroll-html__section">
                    <>
                        <AnimatePresence mode="popLayout">
                            {selectedProduct != i && <motion.header
                                initial="visible"
                                exit="hidden"
                                animate={selectedProduct != i ? 'visible' : "hidden"}
                                variants={wrapVariants}>
                                <h2>{x.buzzline}</h2>
                                {/* <p>{x.description}</p> */}
                            </motion.header>}
                        </AnimatePresence>
                        <div className="scroll-html__section__actions">
                            <motion.button variants={ctaVariants} initial="normal" animate={selectedProduct == i ? "solo" : "normal"}
                                onClick={() => addToCart(i)}>
                                Acheter
                            </motion.button>
                            <AnimatePresence mode="popLayout">
                                {selectedProduct != i && <motion.button onClick={() => selectProductCallback(i)}
                                    variants={btnVariants} initial="visible" exit="hidden">
                                    Personnaliser
                                </motion.button>}
                            </AnimatePresence>
                        </div>
                    </>

                    <AnimatePresence mode="popLayout">
                        {selectedProduct == i && x.colorsPositions.map(
                            (cp, j) => <ColorPicker
                                key={j}
                                productIndex={i}
                                colorIndex={j}
                                position={cp}
                                colors={mainColorsPalette}
                                selectedColor={selectedColors && selectedColors[j] ? selectedColors[j] : 0}
                                choiceCallback={chooseColor} />
                        )}
                    </AnimatePresence>
                </section>
            )}
        </Scroll>
    </>
}

const SceneMemo = memo(function Scene() {
    const { products } = useCustomization()

    return <ScrollControls pages={products.length}>
        <Items />
    </ScrollControls>
})

function App() {
    return <CustomizationProvider>
        <Header />
        <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 25 }} style={{ backgroundColor: "white" }} dpr={[1, 1.5]} eventPrefix="client">
            <ambientLight intensity={1} />
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
            <Suspense>
                <SceneMemo />
            </Suspense>
            <Rig />
        </Canvas>
    </CustomizationProvider>
}

export default App

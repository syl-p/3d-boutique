import { Suspense, useEffect, useRef } from 'react'
import './App.css'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AccumulativeShadows, Box, Center, ContactShadows, Environment, OrbitControls, Plane, RandomizedLight, Scroll, ScrollControls, SpotLightShadow, Stage, Text, useScroll } from '@react-three/drei';
import { easing } from 'maath';
import { CustomizationProvider, useCustomization } from '../contexts/Customization';
import gsap from 'gsap';
import * as THREE from "three"
import ColorPicker from './ColorPicker';
import { delay, motion } from "framer-motion"

function Backdrop() {
    const { mainColor, mainColorsPalette } = useCustomization()
    const shadows = useRef()
    useEffect(() => {
        const newColor = new THREE.Color(mainColorsPalette[mainColor])
        gsap.to(shadows.current.getMesh().material.color, { ...newColor, duration: 1 })
    }, [mainColor, mainColorsPalette])

    return <AccumulativeShadows ref={shadows} frames={100} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, -0.14]}>
        <RandomizedLight amount={4} radius={9} intensity={0.90} ambient={0.25} position={[5, 5, -10]} />
        <RandomizedLight amount={4} radius={5} intensity={0.70} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
}

function Rig() {
    useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [Math.sin(-state.pointer.x) * 0.5, state.pointer.y * 0.35, 0.5 + Math.cos(state.pointer.x) * 2.5],
            0.2,
            delta,
        )
        state.camera.lookAt(0, 0, 0)
    })
}

function Product(props) {
    const scroll = useScroll()
    const { products, setSelectedProduct, selectedProduct } = useCustomization()
    const index = props.index

    useFrame(() => {
        const bool = scroll.visible(index / products.length, index / products.length, 0.1)
        // if (index == 0) {
        //     console.log(bool, selectedProduct, index, products.length)
        // }

        if (!bool && selectedProduct == index) {
            setSelectedProduct(null)
        }
    })

    return <group  {...props}>
        <Center>
            {props.children}
        </Center>
    </group>
}

function Items() {
    const { width: w, height: h } = useThree((state) => state.viewport)
    const { products } = useCustomization()
    const { selectedProduct, setSelectedProduct, mainColorsPalette, mainColor, setMainColor } = useCustomization()

    const wrapVariants = {
        open: {
            opacitiy: 1,
            x: 0,
            transition: {
                delay: .1,
                type: "ease",
                when: "beforeChildren",
                staggerChildren: .1
            }
        },
        closed: {
            opacitiy: 0,
            x: "-100%",
            transition: {
                delay: .1,
                type: "ease",
                when: "beforeChildren",
                staggerChildren: .1
            }
        }
    }


    const stringsVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -100 },
    }

    return <ScrollControls pages={products.length}>
        <Scroll>
            {
                products.map((x, i) =>
                    <Product key={i} position-y={-h * i} index={i}>
                        <Backdrop />
                        {x.component}
                        <Text scale={0.15} position={[0.4 * (i % 2 == 0 ? -1 : 1), 0.45, -0.5]}>
                            {x.title}
                        </Text>
                    </Product>
                )
            }
        </Scroll>
        <Scroll html style={{ width: '100%' }} className="scroll-html">
            {products.map((x, i) =>
                <section key={i} className="scroll-html__section">
                    <>
                        <motion.header
                            animate={selectedProduct != i ? "open" : "closed"}
                            variants={wrapVariants}>
                            <motion.h2 variants={stringsVariants}>{x.buzzline}</motion.h2>
                            <motion.p variants={stringsVariants}>{x.description}</motion.p>
                        </motion.header>
                        <div className="scroll-html__section__actions">
                            <button>Acheter</button>
                            <motion.button onClick={() => setSelectedProduct(i)}
                                animate={{ opacity: selectedProduct != i ? 1 : 0, transition: { delay: .1 } }}>
                                Personnaliser
                            </motion.button>
                        </div>
                    </>

                    {selectedProduct != null && x.colorsPositions.map(
                        (cp, j) => <ColorPicker key={j} position={cp} colors={mainColorsPalette} selectedColor={mainColor} choiceCallback={setMainColor} />
                    )}
                </section>
            )}
        </Scroll>
    </ScrollControls>
}

function App() {
    return <CustomizationProvider>
        <Canvas shadows camera={{ position: [0, 0, 2.5], fov: 25 }} dpr={[1, 1.5]} eventPrefix="client">
            {/* <color attach={"background"} args={["#ccc"]} /> */}
            <ambientLight intensity={1} />
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
            {/* <OrbitControls /> */}
            <axesHelper />
            <Suspense>
                <Items />
            </Suspense>
            <Rig />
        </Canvas>
    </CustomizationProvider>
}

export default App

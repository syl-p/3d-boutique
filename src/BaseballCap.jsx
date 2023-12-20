/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ./public/models/baseball_cap.glb 
Author: Scott VanArsdale (https://sketchfab.com/vanart)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/baseball-cap-1c1d34d73fd94e6b9e8f82b1eb7194a0
Title: Baseball Cap
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCustomization } from '../contexts/Customization'

export function BaseballCap(props) {
  const { nodes, materials } = useGLTF('/models/baseball_cap.glb')
  const { selectedColors, mainColorsPalette } = useCustomization()
  const colors = selectedColors[2] ?? 0

  return (
    <group {...props} dispose={null} scale={0.0025} rotation={[0, - Math.PI / 0.45, 0]} position-z={0.75} position-y={0.125}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow geometry={nodes.baseballCap.geometry} material={materials.baseballCap} material-color={mainColorsPalette[colors[0]]} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow geometry={nodes.plastic.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow geometry={nodes.plastic_1.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow geometry={nodes.baseballCap_2.geometry} material={materials.baseballCap} material-color={mainColorsPalette[colors[1]]} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow geometry={nodes.blinn1SG.geometry} material={materials.blinn1SG} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} material-color={mainColorsPalette[colors[0]]} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/baseball_cap.glb')
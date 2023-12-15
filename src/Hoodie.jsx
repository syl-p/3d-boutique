/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ./public/models/hoodie.glb 
Author: kril (https://sketchfab.com/krrril_)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/classic-black-flame-hoodie-0fd0effa321e456cb2a7467e2899b658
Title: Classic Black Flame Hoodie
*/

import React, { useRef } from 'react'
import { Center, useGLTF } from '@react-three/drei'
import { useCustomization } from '../contexts/Customization'

export function Hoodie(props) {
  const { mainColor, mainColorsPalette } = useCustomization()
  const { nodes, materials } = useGLTF('/models/hoodie.glb')
  return (
    <Center {...props} dispose={null}>
      <group scale={0.01}>
        <group scale={100}>
          <mesh geometry={nodes.hoodie_Rib_2X2_468gsm_hoodie_end_0.geometry} material={materials.Rib_2X2_468gsm_hoodie_end} material-color={mainColorsPalette[mainColor]} />
          <mesh geometry={nodes.hoodie_Sweat_Rib_1X1_319gsm_hoodie_0.geometry} material={materials.Sweat_Rib_1X1_319gsm_hoodie} material-color={mainColorsPalette[mainColor]} />
          <mesh geometry={nodes.hoodie_Sweat_hood_Rib_1X1_319gsm_hood_0.geometry} material={materials.Sweat_hood_Rib_1X1_319gsm_hood} material-color={mainColorsPalette[mainColor]} />
          {/* <mesh geometry={nodes.hoodie_stitches_0.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_1.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_2.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_3.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_4.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_5.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_6.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_7.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_8.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_9.geometry} material={materials.stitches} />
          <mesh geometry={nodes.hoodie_stitches_0_10.geometry} material={materials.stitches} /> */}
        </group>
      </group>
    </Center>
  )
}

useGLTF.preload('/models/hoodie.glb')

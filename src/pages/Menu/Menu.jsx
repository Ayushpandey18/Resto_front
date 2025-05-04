import React from 'react'
import { useState } from 'react'
import "./Menu"
import FoodDisp from '../../components/FoodDisp/FoodDisp'
import Explore from '../../components/Explore/Explore'
const Menu = () => {
  const [catego,setcat]=useState("all");
  return (
    <div>
      <Explore cat={catego} setcat={setcat}/>
      <FoodDisp catego={catego}/>
    </div>
  )
}

export default Menu

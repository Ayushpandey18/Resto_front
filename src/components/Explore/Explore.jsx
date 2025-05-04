import React, { useState } from 'react'
import { menu_list } from '../../assets/assets'
import './Explore.css'
const Explore = ({cat,setcat}) => {
  return (
    <div className='flex flex-col gap-5 apps'>
        
      <h1 className='font-bold text-2xl text-gray-600 pt-8'>Explore Our Menu</h1>
      <p className='quote'>"Eating is not just a material pleasure. Eating well gives a spectacular joy to life."</p>
      <div className="explore-list">
        {
            menu_list.map((val,i)=>{
                return(
                    <div className="exlore-menu-item" onClick={()=>setcat(prev=>prev===val.menu_name?"all":val.menu_name)} key={i}>
                        <img className={cat===val.menu_name?"actives":""} src={val.menu_image} alt="" />
                        <p>{val.menu_name}</p>
                    </div>
                )
            })
        }
      </div>
      <hr />
    </div>
  )
}

export default Explore
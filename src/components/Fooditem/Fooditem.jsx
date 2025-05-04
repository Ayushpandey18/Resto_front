import React, { useContext} from 'react'
import { assets } from '../../assets/assets'
import './Fooditem.css'
import { StoreContext } from '../../context/Storecontext';
const Fooditem = ({id,title,price,description,foodphoto}) => {
  const {cartit,addtocart,remfromcart}=useContext(StoreContext);
  return (
    <div className='fitem'>
        <div className="fimgc">
            <img className='foodimg' src={foodphoto} alt="" />
        {
          !cartit[id]?<img className='add' onClick={()=>{addtocart(id); console.log(id)}} src={assets.add_icon_white} alt="" />:
          <div className="fcounter">
            <img src={assets.remove_icon_red} onClick={()=>remfromcart(id)} alt="" />
            <p>{cartit[id]}</p>
            <img src={assets.add_icon_green} onClick={()=>addtocart(id)} alt="" />
          </div>

        }
        </div>
      <div className="finfo">
        <div className="rating">
        <p>{title}</p>
        <img src={assets.rating_starts} alt="" />
        </div>
        <p className="desc">{description}</p>
        <p className="price">Rs {price}</p>
      </div>
    </div>
  )
}

export default Fooditem
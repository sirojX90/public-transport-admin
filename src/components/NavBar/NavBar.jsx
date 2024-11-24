import React from 'react'
import Navlink from '../Navlink/Navlink'
import dashboardIcon from "../../assets/Images/dashboardIcon.svg"
import bus from "../../assets/Images/bus.svg"
import featuresIcon from "../../assets/Images/featuresIcon.svg"
import check from "../../assets/Images/check.svg"
import card from "../../assets/Images/card.svg"
import complain from "../../assets/Images/examsIcon.svg"
import logo from "../../assets/Images/logo.png"
import { NavLink } from 'react-router-dom'


function NavBar() {
  return (
    <div className='w-[21%] h-[100vh] overflow-y-auto bg-[#152259] pt-[26px] px-[28px] relative'>
      <div className=' text-center mb-10'>
        <img className='block mx-auto text-black' src={logo} alt="site logo" width={150} height={65} />
        <h4 className='mt-[27px] font-semibold text-[25px] text-white leading-[17px] z-10'>Jamoat Transporti</h4>
      </div>
        <span className='block h-[0.5px] w-[100%] bg-[#BDBDBD] left-0 right-0 top-[180px]'></span>
      <div className='pt-[60px] pl-1 space-y-[12px]'>
         <Navlink ImgUrl={dashboardIcon} title={"Dashboard"} URL={'/'}/>
         <Navlink ImgUrl={complain} title={"Shikoyatlar"} URL={'/complain'}/>
         <Navlink ImgUrl={check} title={"Ko'rilganlar"} URL={'/views'}/>
         <Navlink ImgUrl={card} title={"Transport kartalar"} URL={'/transport-cards'}/>
         <Navlink ImgUrl={bus} title={"Avtobus buyurtma"} URL={'/bus-order'}/>
      </div>
    </div>
  )
}

export default NavBar
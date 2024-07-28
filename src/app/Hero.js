import React from 'react'
import {Avatar} from "@nextui-org/avatar";
const Hero = ({title, contents}) => {
  return (
    <div className=" flex flex-row justify-center items-center align-middle gap-5 mx-10 mt-10">
      <div>
        <Avatar className=" w-20 h-20 text-large" size='lg' radius='full' src='https://i.pravatar.cc/150?u=a042581f4e29026024d'/>
      </div>
      <div>
        {title ? <h1 className=" text-xl font-bold">{title}</h1> : null}
        {contents ? <p className=" text-md">{contents}</p> : null}
      </div>
    </div>
  )
}

export default Hero

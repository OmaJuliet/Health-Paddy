import React from 'react'
import { PiHeartbeatFill, PiEarSlash } from "react-icons/pi";
import { FaTooth, FaEye, FaChild } from "react-icons/fa";
import { GiNoseFront, GiLoveInjection } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
// import { BiInjection } from "react-icons/bs";

const Category = () => {
  return (
    <>
      <section className="container mx-auto py-4">
        <section className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-8 gap-6">
          <div className="bg-Blue py-3 rounded-lg flex justify-center">
            <PiHeartbeatFill className="w-5 h-5 text-white" />
            {/* heart */}
          </div>

          <div className="bg-Purple py-3 rounded-lg flex justify-center">
            <FaTooth className="w-5 h-5 text-white" />
            {/* tooth */}
          </div>

          <div className="bg-Orange py-3 rounded-lg flex justify-center">
            <FaEye className="w-5 h-5 text-white" />
            {/* eye */}
          </div>

          <div className="bg-Yellow py-3 rounded-lg flex justify-center">
            <PiEarSlash className="w-5 h-5 text-white" />
            {/* ear */}
          </div>

          <div className="bg-Green py-3 rounded-lg flex justify-center">
            <GiNoseFront className="w-5 h-5 text-white" />
            {/* nose */}
          </div>

          <div className="bg-lightBlue py-3 rounded-lg flex justify-center">
            <FaChild className="w-5 h-5 text-white" />
            {/* children */}
          </div>

          <div className="bg-Pink py-3 rounded-lg flex justify-center">
            <GiLoveInjection className="w-5 h-5 text-white" />
            {/* surgeon */}
          </div>

          <div className="bg-Red py-3 rounded-lg flex justify-center">
            <FaUserDoctor className="w-5 h-5 text-white" />
            {/* general */}
          </div>
        </section>
      </section>
    </>
  )
}

export default Category
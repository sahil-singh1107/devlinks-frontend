"use client"
import LinkForm from '@/components/LinkForm'
import LinksScreen from '@/components/LinksScreen'
import Navbar from '@/components/Navbar'
//import axios from 'axios'
import React, { useState } from 'react'
//import {a} from "./api/create"

const page = () => {


  return (
      <div>
        <Navbar />
        <div className='flex flex-row h-screen overflow-y-hidden mt-9'>
          <div className='w-1/2 hidden lg:block lg:max-w-[769px] lg:max-h-[898px]'>
            <LinksScreen />
          </div>
          <div className='w-full h-full'>
            <LinkForm />
          </div>
        </div>

      </div>
  )
}

export default page
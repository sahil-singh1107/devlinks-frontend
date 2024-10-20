//import { useUser } from '@clerk/clerk-react';
"use client"
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IconContext } from "react-icons";

const page = ({ params }) => {
  const userInfo = params.userInfo
  let index = userInfo.indexOf("user");
  let name = userInfo.slice(0, index);    // "sahil"
  let clerkId = userInfo.slice(index);
  const router = useRouter();

  const [linkTrees, setLinkTrees] = useState([])
  const containerRef = useRef(null);
  const deleteZoneRef = useRef(null);

  useEffect(() => {
    const getLinkTrees = async () => {
      try {
        const res = await axios.post(process.env.NEXT_PUBLIC_GET_ALL_LINK_TREE, { clerkId })
        setLinkTrees(res.data)
      } catch (error) {
        console.log(error)
      }

    }
    getLinkTrees()
  }, [])

  const handleClick = () => {
    router.push('/')
  }

  const isOverlapping = (dragElement) => {
    const deleteZone = deleteZoneRef.current.getBoundingClientRect();
    const draggedElement = dragElement.getBoundingClientRect();

    return (
      draggedElement.right > deleteZone.left &&
      draggedElement.left < deleteZone.right &&
      draggedElement.bottom > deleteZone.top &&
      draggedElement.top < deleteZone.bottom
    );
  };

  const handleDragEnd = async (event, info, index) => {
    const dragElement = event.target;

    if (isOverlapping(dragElement)) {
      try {
        const res = await axios.post(process.env.NEXT_PUBLIC_DELETE_LINK_TREE, { clerkId, username: linkTrees[index].username });
        console.log(res);
        
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Not in delete zone');
    }
  };



  return (
    <>
      <div className="flex justify-center mt-6">
        <UserButton />
      </div>
      <div className="w-full border border-gray mt-8"></div>
      <div ref={containerRef} className="flex flex-wrap p-9 space-x-2 justify-around h-[45vw]">
        {
          linkTrees.map((ele, index) => (
            <motion.div drag dragConstraints={containerRef} onDragEnd={(event, info) => handleDragEnd(event, info, index)} whileDrag={{ scale: 1.2 }} className='relative w-60 h-72 rounded-2xl bg-purple-500/90 text-white px-8 py-10 overflow-hidde hover:brightness-75 z-20'>
              <Link href={`/linktree/${ele.username}`}>
                <p className='text-sm font-bold mt-20 hover:text-blue-100 text-center'>{ele.username}</p>
                <div className='footer absolute bottom-0 w-full left-0'>
                  <div className='flex items-center py-3 px-8 justify-between mb-5'>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        }
      </div>
      <div ref={deleteZoneRef} className="absolute bottom-5 left-5 bg-red-500 rounded-full p-4">
        <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
          <FaTrash />
        </IconContext.Provider>
      </div>
      <button className="absolute z-10 bottom-5 right-5 w-12 h-12 bg-yellow-100 text-white rounded-full flex items-center justify-center hover:shadow-md" onClick={handleClick}>
        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", size: "1.5em" }}>
          <FaPlus />
        </IconContext.Provider>
      </button>
    </>
  )
}

export default page
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from "../public/images/logo-devlinks-large.svg"
import smallLogo from "/public/images/logo-devlinks-small.svg"
import linkImage from '../public/images/icon-link.svg';
import linkHeader from "../public/images/icon-links-header.svg"
import preview from "/public/images/icon-preview-header.svg"
import { UserButton } from '@clerk/nextjs';
import MobilePreview from '@/components/MobilePreview'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const router = useRouter();

  const { user, isSignedIn } = useUser()
  let clerkId,name;
  if (isSignedIn) {
    clerkId = user?.id
    name = user?.firstName
    //console.log(clerkId)
  }

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const toggleDialog = () => {

    if (width <= 1020) setIsDialogOpen(!isDialogOpen);
  };

  const handleClick = () => {
    const path = name + clerkId;
    router.push(`/dashboard/${path}`)
  }


  return (
    <div className="mt-4 mb-4 pl-3 pr-3 bg-[#fefeff]">
      <div className="flex justify-between items-center">
        <div className="hidden md:block">
          <Image src={logo} alt="Devlinks large logo" width={150} height={100} />
        </div>
        <div className="block md:hidden">
          <Image src={smallLogo} alt="Devlinks small logo" width={30} height={30} />
        </div>
        <nav className="flex space-x-6">
          <div className='hidden md:block'>
            <button className="flex items-center bg-[#eeeaff] text-[#7550fe] px-4 py-2 rounded" onClick={handleClick}>
              <Image src={linkImage} alt="Link Icon" width={20} height={20} className="mr-2" />
              Link
            </button>
          </div>
          <div className='block md:hidden'>
            <button className="flex items-center bg-[#eeeaff] text-[#7550fe] px-4 py-2 rounded">
              <Image src={linkHeader} alt="Link Icon" width={20} height={20} className="mr-2" />
              Link
            </button>
          </div>
          <button className="flex items-center text-[#7550fe] hover:bg-[#eeeaff] rounded px-4 py-2">
            <UserButton showName />
          </button>
        </nav>
        <div className='hidden md:block'>
          <button onClick={toggleDialog} className="px-4 py-2 bg-white text-[#7550fe] border border-[#7550fe] rounded hover:bg-[#eeeaff]">
            Preview
          </button>
        </div>
        <div className='block md:hidden'>
          <button onClick={toggleDialog} className="px-4 py-2 bg-white text-[#7550fe] border border-[#7550fe] rounded hover:bg-[#eeeaff]">
            <Image src={preview} />
          </button>
        </div>
        {isDialogOpen && <MobilePreview />}
      </div>
    </div>
  );
};

export default Navbar;

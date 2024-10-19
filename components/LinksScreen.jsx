import React, { memo, useEffect, useState } from 'react';
import phonemockup from "../public/images/illustration-phone-mockup.svg";
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import gitlab from "../public/images/icon-gitlab.svg"
import Link from 'next/link';
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, NumberDictionary } from 'unique-names-generator';
import github from "../public/images/icon-github.svg"
import youtube from "../public/images/icon-youtube.svg"
import facebook from "../public/images/icon-facebook.svg"
import freecodecamp from "../public/images/icon-freecodecamp.svg"
import codepen from "../public/images/icon-codepen.svg"
import codewars from "../public/images/icon-codewars.svg"
import devto from "../public/images/icon-devto.svg"
import frontendmentor from "../public/images/icon-frontend-mentor.svg"
import hashnode from "../public/images/icon-hashnode.svg"
import arrow from "/public/images/icon-arrow-right.svg"

const url = process.env.NEXT_PUBLIC_CREATE_LINK_TREE

const LinkForm = () => {
    const [links, setLinks] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    let options = [

        {
            name: "GitHub",
            imageUrl: github,
            color: "black"
        },
        {
            name: "Youtube",
            imageUrl: youtube,
            color: "red"
        },
        {
            name: "Facebook",
            imageUrl: facebook,
            color: "blue"
        },
        {
            name: 'Freecodecamp',
            imageUrl: freecodecamp,
            color: "#1A1A32"
        },
        {
            name: "GitLab",
            imageUrl: gitlab,
            color: "black"
        },
        {
            name: "Devto",
            imageUrl: devto,
            color: "#F4F4F5"
        },
        {
            name: "FrontendMentor",
            imageUrl: frontendmentor,
            color: "white"
        },
        {
            name: "Codepen",
            imageUrl: codepen,
            color: "#121517"
        },
        {
            name: "Codewars",
            imageUrl: codewars,
            color: "#411C1E"
        },
        {
            name: "Hashnode",
            imageUrl: hashnode,
            color: "#C9D8FA"
        }
    ]
    const colorClasses = {
        GitHub: "bg-black",
        Youtube: "bg-red-500",
        Facebook: "bg-blue-600",
        Freecodecamp: "bg-gray-900",
        GitLab: "bg-black",
        Devto: "bg-gray-200",
        FrontendMentor: "bg-white",
        Codepen: "bg-gray-800",
        Codewars: "bg-red-700",
        Hashnode: "bg-blue-100",
    };
    let linkTreeName = localStorage.getItem("linkTreeName")
    const { user, isSignedIn } = useUser();
    let clerkId;
    let imageUrl;
    if (isSignedIn) {
        clerkId = user?.id;
        imageUrl = user?.imageUrl
    }

    useEffect(() => {
        const postData = async () => {
            if (clerkId) {
                try {

                    const response = await axios.post(process.env.NEXT_PUBLIC_GET_LINKS, { clerkId });
                    
                    const newLinks = response.data.map(ele => ({
                        platform: ele.platform,
                        link: ele.link,
                        imageUrl: gitlab
                    }));

                 

                    setLinks(prevLinks => [...prevLinks, ...newLinks]);

                } catch (error) {
                    console.error('Error making POST request:', error);
                }
            }
        };
        postData();
    }, [clerkId]);

    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-20 h-20", 
        },
    };

    const handleOnClick = () => {
        const shortName = uniqueNamesGenerator({
            dictionaries: [animals, colors, adjectives]
        });

        try {
            if (!linkTreeName) {
                axios.post(url, { imageUrl, links, username: shortName });
                localStorage.setItem("linkTreeName", shortName);
                linkTreeName = shortName
            }
        } catch (error) {
            console.log(error);
        } finally {
            
            window.open(`/linktree/${linkTreeName || shortName}`, '_blank');
        }
    }
    //console.log(linkTreeName)

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;

        
        const updatedLinks = [...links];
        const draggedLink = updatedLinks[draggedIndex];
        updatedLinks[draggedIndex] = updatedLinks[index];
        updatedLinks[index] = draggedLink;

        setLinks(updatedLinks);
        setDraggedIndex(null); 
    };

    function getLink(platform) {
        let res;
        options.forEach(element => {
            if (element.name === platform) {
                res = element.imageUrl;
            }
        });
        return res;

    }

    return (
        <div className='relative flex justify-center'>
            <Image src={phonemockup} alt="Phone Mockup" />
            <div className='absolute top-[115px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                <UserButton appearance={userButtonAppearance} />
                <p className='absolute top-[112px] left-[27%] text-red-800 font-bold text-xs'>
                    {user?.firstName?.toUpperCase() || "User"} 
                </p>
                <div className='absolute w-[240px] top-[300px] mt-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                    {links.map((ele, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(index)}
                            className={`cursor-move ${colorClasses[ele.platform]} flex mb-7 rounded-md`}
                        >
                            <Link href={`//${ele.link}`} className='flex items-center justify-between w-full h-8'>
                                <Image src={getLink(ele.platform)} alt='platform logo' className='w-6 h-6' />
                                <Image src={arrow} className='w-4 h-4 ml-4' />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <button className='absolute text-sm p-2 border font-semibold text-[#7550fe] border-[#7550fe] rounded-md' onClick={handleOnClick}>{!linkTreeName ? "Create" : "Link Tree"}</button>
        </div>
    );
};

export default LinkForm;

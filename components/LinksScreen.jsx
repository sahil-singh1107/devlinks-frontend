import React, { memo, useEffect, useState } from 'react';
import phonemockup from "../public/images/illustration-phone-mockup.svg";
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import gitlab from "../public/images/icon-gitlab.svg";
import Link from 'next/link';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import github from "../public/images/icon-github.svg";
import youtube from "../public/images/icon-youtube.svg";
import facebook from "../public/images/icon-facebook.svg";
import freecodecamp from "../public/images/icon-freecodecamp.svg";
import codepen from "../public/images/icon-codepen.svg";
import codewars from "../public/images/icon-codewars.svg";
import devto from "../public/images/icon-devto.svg";
import frontendmentor from "../public/images/icon-frontend-mentor.svg";
import hashnode from "../public/images/icon-hashnode.svg";
import arrow from "/public/images/icon-arrow-right.svg";
import { ColorRing } from 'react-loader-spinner';

const url = process.env.NEXT_PUBLIC_CREATE_LINK_TREE;

const LinkForm = ({ isLoading, setIsLoading }) => {
    const [links, setLinks] = useState([    ]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isDropLoading, setIsDropLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    let options = [
        { name: "GitHub", imageUrl: github, color: "black" },
        { name: "Youtube", imageUrl: youtube, color: "red" },
        { name: "Facebook", imageUrl: facebook, color: "blue" },
        { name: 'Freecodecamp', imageUrl: freecodecamp, color: "#1A1A32" },
        { name: "GitLab", imageUrl: gitlab, color: "black" },
        { name: "Devto", imageUrl: devto, color: "#F4F4F5" },
        { name: "FrontendMentor", imageUrl: frontendmentor, color: "white" },
        { name: "Codepen", imageUrl: codepen, color: "#121517" },
        { name: "Codewars", imageUrl: codewars, color: "#411C1E" },
        { name: "Hashnode", imageUrl: hashnode, color: "#C9D8FA" }
    ];
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
    const { user, isSignedIn } = useUser();
    let clerkId;
    let imageUrl;
    if (isSignedIn) {
        clerkId = user?.id;
        imageUrl = user?.imageUrl;
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
                    setLinks(prevLinks => [...newLinks, ...prevLinks]);
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

    const handleOnClick = async () => {
        setIsCreating(true);
        const shortName = uniqueNamesGenerator({
            dictionaries: [animals, colors, adjectives]
        });

        try {
            await axios.post(url, { imageUrl, links, username: shortName, clerkId });
        } catch (error) {
            console.log(error);
        }
        setIsCreating(false);
    };

    const handleDragStart = (index) => {
        setIsDropLoading(true);
        setDraggedIndex(index);
    };

    const handleDrop = (index) => {
        setIsDropLoading(false);
        // Check if dropped in delete area
        if (index === links.length) {
            handleRemoveLink(draggedIndex); // Call remove link function
        } else if (draggedIndex !== null && draggedIndex !== index) {
            const updatedLinks = [...links];
            const draggedLink = updatedLinks[draggedIndex];
            updatedLinks[draggedIndex] = updatedLinks[index];
            updatedLinks[index] = draggedLink;

            setLinks(updatedLinks);
        }
        setDraggedIndex(null);
    };

    const getLink = (platform) => {
        let res;
        options.forEach(element => {
            if (element.name === platform) {
                res = element.imageUrl;
            }
        });
        return res;
    };

    // New function to remove a link
    const handleRemoveLink = async (index) => {
        if (index === -1 || links[index].platform === "delete") return; // Prevent removal from delete area

        const linkToRemove = links[index].link; // Get the link to remove

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_DELETE_LINK, { link: linkToRemove });

            if (response.status === 200) {
                // Update the state to remove the link from the UI
                setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error('Error deleting link:', error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <>
            {isCreating && (
                <div className='absolute z-30 left-1/2 transform -translate-x-1/2 translate-y-[180px]'>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            )}
            <div className={`relative flex justify-center ${isCreating && "blur-sm"} border rounded-md`}>
                <div className='hover:brightness-75'>
                    <Image src={phonemockup} alt="Phone Mockup" className={`${isDropLoading && "blur-sm "}`} />
                </div>

                <div className={`absolute top-[115px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}>
                    <div className='z-10'>
                        <UserButton appearance={userButtonAppearance} />
                    </div>

                    <p className='absolute top-[112px] text-center text-red-800 font-bold text-xs z-10'>
                        {user?.firstName?.toUpperCase().slice(6) || "User"}
                    </p>
                    <div className='absolute w-[240px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[270px] h-72 flex flex-col gap-y-4 z-10'>
                        <ul>
                            {links.map((ele, index) => (
                                <li key={index}>
                                    <div
                                        draggable
                                        onDragStart={() => handleDragStart(index)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(index)}
                                        className={`cursor-move ${colorClasses[ele.platform]} flex flex-col rounded-md h-[36px] mb-[26px] hover:brightness-75`}
                                    >
                                        <Link href={`//${ele.link}`} className='flex items-center justify-between w-full h-8'>
                                            <Image src={getLink(ele.platform)} alt='platform logo' className='w-6 h-6 ml-2' />
                                            <p className='text-white'>{ele.platform}</p>
                                            <Image src={arrow} className='mr-8' />
                                        </Link>
                                        
                                        
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* Delete Area */}
                        <div 
                            onDragOver={(e) => e.preventDefault()} 
                            onDrop={() => handleDrop(links.length)} 
                            className="absolute border-2 border-red-500 text-center text-white rounded-md p-2 top-64 w-60 cursor-pointer bg-red-500"
                        >
                            Drop here to delete
                        </div>
                    </div>
                </div>

                <button className={`absolute ${isDropLoading && "blur-sm"} text-sm p-2 border font-semibold text-[#7550fe] border-[#7550fe] rounded-md`} onClick={handleOnClick}>Create</button>
            </div>
        </>
    );
};

export default LinkForm;

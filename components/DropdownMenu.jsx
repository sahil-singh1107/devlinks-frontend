// src/Dropdown.js
import React, { useState } from 'react';
import down from "../public/images/icon-chevron-down.svg"
import Image from 'next/image';
import github from "../public/images/icon-github.svg"
import youtube from "../public/images/icon-youtube.svg"
import facebook from "../public/images/icon-facebook.svg"
import freecodecamp from "../public/images/icon-freecodecamp.svg"
import gitlab from "../public/images/icon-gitlab.svg"
import codepen from "../public/images/icon-codepen.svg"
import codewars from "../public/images/icon-codewars.svg"
import devto from "../public/images/icon-devto.svg"
import frontendmentor from "../public/images/icon-frontend-mentor.svg"
import hashnode from "../public/images/icon-hashnode.svg"


const Dropdown = ({selectedOption, setSelectedOption, currUrl, setCurrUrl}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const [options, setOptions] = useState([
        {
            name: "GitHub",
            imageUrl: github
        },
        {
            name: "Youtube",
            imageUrl: youtube
        },
        {
            name: "Facebook",
            imageUrl: facebook
        },
        {
            name: 'Freecodecamp',
            imageUrl: freecodecamp
        },
        {
            name: "GitLab",
            imageUrl: gitlab
        },
        {
            name: "Devto",
            imageUrl: devto
        },
        {
            name: "FrontendMentor",
            imageUrl: frontendmentor
        },
        {
            name: "Codepen",
            imageUrl: codepen
        },
        {
            name: "Codewars",
            imageUrl: codewars
        },
        {
            name: "Hashnode",
            imageUrl: hashnode
        }
    ])
    

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleClick = (name, imageUrl) => {
        setSelectedOption(name)
        setCurrUrl(imageUrl)
        setIsOpen(prev => !prev);
    }   

    return (
        <div className="relative border hover:border hover:border-[#7550fe]">
            <div>
                <button
                    type='button'
                    onClick={toggleDropdown}
                    className="w-full flex justify-between p-3 rounded-md"
                >
                    <div className='flex space-x-2'>
                        <Image src={currUrl} alt='github' />
                        <p>{selectedOption}</p>
                    </div>
                    <Image src={down} alt='wfwf' />
                </button>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
                    <div className="rounded-md bg-white shadow-xs">
                        {options.map((option, index) => (
                            <button
                                type='button'
                                key={index}
                                onClick={(e) => handleClick(option.name, option.imageUrl)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <div className='flex space-x-2'>
                                    <Image src={option.imageUrl} alt='github' />
                                    <p>{option.name}</p>
                                </div>

                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

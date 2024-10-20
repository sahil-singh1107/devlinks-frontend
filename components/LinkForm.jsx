import React, { useState } from 'react';
import empty from "../public/images/illustration-empty.svg";
import Image from 'next/image';
import 'react-dropdown/style.css';
import Dropdown from './DropdownMenu';
import linkIcon from "../public/images/icon-link.svg"
import linkHeader from "../public/images/icon-links-header.svg"
import github from "../public/images/icon-github.svg"
import axios from 'axios';
import { useUser } from '@clerk/clerk-react'
import { Audio, ColorRing } from 'react-loader-spinner'


const LinkForm = ({ isLoading, setIsLoading }) => {
    // Handler for adding a new link
    const [fields, setFields] = useState(0)
    const [link, setLink] = useState(null)
    const [selectedOption, setSelectedOption] = useState("GitHub");
    const [currUrl, setCurrUrl] = useState(github)
    const [error, setError] = useState('')


    const { user, isSignedIn } = useUser()
    let clerkId;
    if (isSignedIn) {
        clerkId = user?.id
        //console.log(clerkId)
    }

    const handleAddNewLink = () => {
        setFields(prev => prev + 1);
    }


    const handleRemove = () => {
        if (fields > 0) setFields(prev => prev - 1)
    }

    const handleSave = async (e) => {
        console.log(error);
        e.preventDefault()
        if (error || !fields) return;
        setError(null)
        if (!link) {
            setError("Can't be empty")
            return;
        }

        if (!link.includes(selectedOption.toLowerCase())) {
            setError('Please check the url')
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_CREATE_LINK_URL, {
                platform: selectedOption,
                link: link,
                clerkId: clerkId,
            });
        } catch (error) {
            console.error('Error saving link:', error);
            setError('An error occurred while saving the link.');
        } finally {
            // Always stop the loader, regardless of success or error
            setIsLoading(false);
        }

        //console.log(res);
    }

    

    return (
        <>
            {
                isLoading && !error && (
                    <div className='absolute z-20 left-1/2 transform -translate-x-1/2 translate-y-[180px]'>
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
                )
            }


            <div className={`relative h-[91vh] ml-3 mr-3 border p-4 ${isLoading && "blur"} rounded-md`}>
                <div className='h-full overflow-y-auto pb-16'>
                    <div className='pt-10 space-y-3'>
                        <h1 className='font-bold text-3xl'>Customize Your Links</h1>
                        <p className='text-[#737372]'>
                            Add/edit/remove links below and then share all your profiles with the world.
                        </p>
                        <button
                            onClick={handleAddNewLink}
                            className='text-[#7550fe] border border-[#7550fe] rounded w-full pt-3 pb-3 font-semibold hover:bg-[#eeeaff]'
                        >
                            + Add New Link
                        </button>

                        {fields === 0 && (
                            <div className='flex flex-col items-center justify-center border mt-4 p-4 ml-4 mr-4 h-96'>
                                <Image className='' src={empty} alt='Illustration depicting empty state for links' />
                                <p className='text-center text-[#737372]'>
                                    Use the "Add new link" button to get started.<br />
                                    Once you have more than one link, you can reorder and edit them. We're here to help<br />
                                    you share your profiles with everyone.
                                </p>
                            </div>
                        )}

                        {fields && (
                            <div className='bg-[#fafafa] mt-4 p-3'>
                                <div className='flex justify-between text-[#737372] text-xl mb-2'>
                                    <div className='flex space-x-3'>
                                        <Image src={linkHeader} />
                                        <p>Link #1</p>
                                    </div>
                                    <button onClick={handleRemove} className='text-sm'>Remove</button>
                                </div>
                                <form className='bg-[#fafafa]'>
                                    <div className='flex flex-col'>
                                        <label className='text-[#737372] mb-2'>Platform</label>
                                        <Dropdown selectedOption={selectedOption} setSelectedOption={setSelectedOption} currUrl={currUrl} setCurrUrl={setCurrUrl} />
                                    </div>
                                    <div className='flex flex-col border p-2'>
                                        <label className='text-[#737372] mt-2'>Link</label>
                                        <div className='flex mt-3 space-x-2'>
                                            <div className={`relative w-full ${error && 'border border-rose-500'}`}>
                                                <Image src={linkIcon} className='absolute left-3 top-1/2 transform -translate-y-1/2' />
                                                <input type='text' placeholder={link ? link : "Add Link"} className='h-10 rounded-sm p-3 pl-10 w-[80%] hover:border hover:border-[#7550fe] focus-visible:border-[#7550fe]' value={link} onChange={(e) => setLink(e.target.value)} />
                                            </div>
                                            <div>
                                                {error && (
                                                    <p className='text-sm ml-5 text-rose-500'>{error}</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                </form>
                            </div>
                        )}

                    </div>
                </div>

                <div className='absolute bottom-4 right-4'>
                    <button disabled={isLoading || error || !fields} onClick={(e) => handleSave(e)} className={`bg-[#633bff] ${isLoading && 'brightness-75'} hover:brightness-75 pl-5 pr-5 pt-2 pb-2 rounded-md text-white`}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default LinkForm;

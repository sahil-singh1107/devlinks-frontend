"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import clipboard from "/public/images/icon-link-copied-to-clipboard.svg";
import Image from 'next/image';

const url = process.env.NEXT_PUBLIC_GET_LINK_TREE

const Page = ({ params }) => {
  const username = params.username;
  const [links, setLinks] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [copySuccess, setCopySuccess] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const res = await axios.post(url, { username });
        setImgUrl(res.data[1]); 
        setLinks(res.data[0]); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [username]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true); 
    setTimeout(() => setCopySuccess(false), 2000); 
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* Profile Section */}
      <div className="mt-10 flex flex-col items-center space-y-3">
        <img
          src={imgUrl || "https://freesvg.org/img/abstract-user-flat-4.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-[#512275]"
        />
        <p className="text-3xl font-bold text-[#512275]">{username}</p>
      </div>

     
      <div className="mt-8 w-full max-w-md p-4 space-y-4">
        {loading ? ( 
          <p className="text-center text-gray-500">Loading...</p>
        ) : links.length > 0 ? (
          links.map((ele, i) => (
            <div key={i} className="bg-[#f7f3ff] border border-[#ddd6f3] rounded-lg p-3 hover:shadow-md transition-all">
              <Link href={`//${ele.link}`} target="_blank" className="text-[#512275] font-semibold flex justify-center">
                <p>{ele.platform}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No links available</p>
        )}
      </div>

      <button onClick={handleCopyLink} className='flex space-x-3 items-center mt-4 hover:border hover:rounded-md hover:border-[#ddd6f3] p-4'>
        <Image src={clipboard} alt='clip' />
        <span>Copy Link</span>
      </button>
      {copySuccess && <p className="text-green-500 mt-2">Link copied to clipboard!</p>}
    </div>
  );
}

export default Page;

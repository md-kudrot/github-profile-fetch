import React from 'react'
import { DataContext } from '../Contexts/Contexts';
import { BookMarked, Eye, Link, RssIcon, UserCheck } from 'lucide-react';

export default function Home() {
  const {data} = React.useContext(DataContext);
  
  return (
    <main className="w-full h-screen mx-auto pt-10">
      <section className='flex gap-6'>
        <div className="flex justify-center relative">
          <img
            src={data.data.avatar_url}
            alt={`${data.data.name}'s avatar`}
            className="w-40 h-40 rounded-2xl mx-auto"
          />
          <p className="absolute bottom-0 left-2 text-center text-white text-sm cursor-default">{data.data.login}</p>
        </div>
        <div className="p-4 bg-gray-100 w-full rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-700">
            {data.data.name}
          </h1>
          <p className="text-lg text-green-600 mt-2">
            {data.data.bio}
          </p>
        </div>
      </section>
      <section className='flex gap-4 mt-6'>
          <button type='button' className='bg-gray-100 text-green-700 px-3 py-1 rounded-full shadow-md flex items-center gap-1 w-max mt-4 cursor-pointer'>
            <span className='font-semibold pr-2'>{data.data.following}</span>
            <RssIcon size={15}/>
            following
          </button >
          <button type='button' className='bg-gray-100 text-green-700 px-3 py-1 rounded-full shadow-md flex items-center gap-1 w-max mt-4 cursor-pointer'>
            <span className='font-semibold pr-2'>{data.data.followers}</span>
            <UserCheck size={15}/>
            followers
          </button>
          <button type="button" className='bg-gray-100 text-green-700 px-3 py-1 rounded-full shadow-md flex items-center gap-1 w-max mt-4 cursor-pointer'>
            <span className='font-semibold pr-2'>{data.data.public_repos}</span>
            <BookMarked size={15}/>
            repositories
          </button>
          
          {data.data.blog && <a target='_blank' href="https://github.com/Siam2p" rel='noopener noreferrer' className='bg-gray-100 text-green-700 px-3 py-1 rounded-full shadow-md flex items-center gap-1 w-max mt-4 cursor-pointer'>
            <Eye size={15} />
          View Profile
          </a>}
          {data.data.blog && <a target='_blank' href={data.data.blog} rel='noopener noreferrer' className='bg-gray-100 text-green-700 px-3 py-1 rounded-full shadow-md flex items-center gap-1 w-max mt-4 cursor-pointer'>
            <Link size={15} />
          View Blog
          </a>}
      </section>
    </main>
  )
}



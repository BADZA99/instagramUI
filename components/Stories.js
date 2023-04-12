// import React from 'react'
import minifaker from 'minifaker';
import "minifaker/locales/en"
import { useEffect, useState } from 'react';
import Story from './Story';

export default function Stories() {
    const [storyUsers,setStoryUsers]=useState([]);
    useEffect(()=>{
        const storyUser=minifaker.array(20,(i)=>(
            {
                username: minifaker.username({lacal:"en"}).toLowerCase(),
                img:`https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}}`,
                id: i,
            }
        ));
        setStoryUsers(storyUser);
        // console.log(storyUser);
    },[])
  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none'>
        {storyUsers.map(user=>(
            <Story key={user.id} username={user.username} img={user.img}/>
        ))}
      
    </div>
  )
}

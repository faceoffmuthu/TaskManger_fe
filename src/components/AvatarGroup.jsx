import React from 'react'
import { BASE_URL } from '../utils/apiPaths';

const getAvatarSrc = (avatar) => {
    if (!avatar) return 'https://placehold.co/80x80/e2e8f0/64748b?text=User';
    if (avatar.startsWith('http://') || avatar.startsWith('https://')) return avatar;
    if (avatar.startsWith('/')) return `${BASE_URL}${avatar}`;
    return `${BASE_URL}/${avatar}`;
};

const AvatarGroup = ({avatars,maxVisible = 3}) => {
  return (
    <div className='flex items-center'>
        {avatars.slice(0,maxVisible).map((avatar,index)=>(
            <img
            key={index}
            src={getAvatarSrc(avatar)}
            alt={`Avatar ${index}`}
            className='w-12 h-12 rounded-full border-2 border-white -ml-4 first:ml-0 object-cover'
            onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/80x80/e2e8f0/64748b?text=User';
            }}
            />
        ))}
        {avatars.length > maxVisible && (
            <div className='w-12 h-12 rounded-full bg-blue-50 text-base flex items-center justify-center font-medium border-2 border-white -ml-4'>
                +{avatars.length - maxVisible}
            </div>
        )}
    </div>
  )
}

export default AvatarGroup

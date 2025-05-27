import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
  return (
    <main className='flex-1 flex items-center justify-center'>
      <DotLottieReact src='/src/assets/lottie/404notfound.lottie' loop autoplay className='w-[50%]'/>
    </main>
  )
}

export default NotFound
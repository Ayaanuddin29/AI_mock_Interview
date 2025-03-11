import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
function Header() {

    // const path=usePathname();
    // useEffect(()=>{
    //     console.log(path);
    // },[])
  return (
    <div className='flex p-4 justify-between items-center bg-black text-white shadow-sm'>
      <Link href={'/dashboard'}> <Image src={'/favicon.ico'} width={120} height={90} alt='logo'/></Link>
      <ul className='gap-6 hidden md:flex'>
        <Link href={'/dashboard'} className='hover:text-primary hover:font-bold transition-all cursor-pointer '>Dashboard</Link>
        <Link href={'/dashboard/working'} className='hover:text-primary hover:font-bold transition-all cursor-pointer'>How it Works</Link>
        <Link href={'/dashboard/about'} className='hover:text-primary hover:font-bold transition-all cursor-pointer'>About Dev</Link>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header

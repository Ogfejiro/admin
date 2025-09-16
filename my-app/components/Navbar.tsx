import React from 'react'
import Image from 'next/image'
import logo from '@/images/logo.jpg'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from './modetoogle'



const Navbar = () => {
  return (
    <div className='bg-primary dark:bg-slate-700 '>
      <div className='flex justify-between items-center py-2 px-5'>
        <div>
        <Image src={logo} alt='logo' width={40}></Image>
      </div>

      
      <div className='flex justify-between align-center'>
        <div>
       <ModeToggle/>
      </div>

       <div>
<DropdownMenu>
  <DropdownMenuTrigger className='focus:outline-none'><Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href='/dashboard'>Dashboard</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href='/profile'>Profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Link href='/report'>Report</Link>
    </DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
</div>
      </div>
      </div>
    </div>
  )
}

export default Navbar

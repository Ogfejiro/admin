import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { LayoutDashboard, Newspaper, Folders, CreditCard, Settings, User, Folder,  } from 'lucide-react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <Command className='bg-secondary rounded-none'>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <LayoutDashboard className='mr-2 h-4 w-4'/>
        <Link href='/dashboard'>Dashboard</Link>
      </CommandItem>
      <CommandItem>
        <User className='mr-2 h-4 w-4'/>
        <Link href='/profile'>Profile</Link>
      </CommandItem>
      <CommandItem>
        <Folder className='mr-2 h-4 w-4'/>
        <Link href='/folder'>Reports</Link>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Others">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
    
  )
}

export default Sidebar

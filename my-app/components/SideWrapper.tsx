"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar'; // Import your Sidebar component

export default function SidebarWrapper() {
  const pathname = usePathname();

  // Check if the current path is the main page (e.g., '/')
  // Add other paths like '/login' or '/signup' if you don't want the sidebar there either
  const isMainPage = pathname === '/';

  return isMainPage ? null : <Sidebar />;
}
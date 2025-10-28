"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";

export default function Header () {
  const pathname = usePathname();

     return (
       <header className="w-full flex items-center justify-between px-4 py-2 x-bg-glass border-b border-white">
         <Link href="/">
           <Image
             src="/logo.png"
             alt="WeSplit Logo"
             width={86}
             height={20}
             className="object-contain"
           />
         </Link>
         {pathname.startsWith("/group") && (
           <h2 className="x-group-title">Group Name</h2>
         )}
         <Link href="/">
           <UserAvatar />
         </Link>
       </header>
     );
}
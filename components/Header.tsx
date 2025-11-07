"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import { useGroup } from "@/contexts/groupContext";

export default function Header () {
  const { userAvatar } = useUser();
  const {group} = useGroup();
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
         {pathname.includes("/group") && (
           <h2 className="x-group-title">{group?.name}</h2>
         )}
         <Link href="/">
           {userAvatar !== null ? (
             <Image
               src={userAvatar}
               alt="User Avatar"
               width={32}
               height={32}
               className="rounded-full object-cover"
             />
           ) : (
             <div className="w-8 h-8 rounded-full bg-gray-500" />
           )}
         </Link>
       </header>
     );
}
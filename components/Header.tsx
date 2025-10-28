import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

export default function Header () {
     return (
       <header className="w-full flex items-center justify-between px-4 py-2 x-bg-glass border-b border-white">
         <Link href="/dashboard">
           <Image
             src="/logo.png"
             alt="WeSplit Logo"
             width={86}
             height={20}
             className="object-contain"
           />
         </Link>
         <div className="">
           <UserAvatar />
         </div>
       </header>
     );
}
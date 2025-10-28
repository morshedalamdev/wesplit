import { Home, LogOut, Plus, Settings } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

export default function Sidebar () {
     return (
       <aside className="w-12 h-[calc(100vh-48px)] py-4 flex flex-col justify-between items-center x-bg-glass border-r border-white">
         <div className="flex flex-col gap-3 items-center">
           <Link href="/dashboard">
             <Button size="icon" className="rounded-full">
               <Home />
             </Button>
           </Link>
           <Link href="/group/1">
             <UserAvatar />
           </Link>
           <Link href="/group/2">
             <UserAvatar />
           </Link>
           <Link href="/group/3">
             <UserAvatar />
           </Link>
           <Link href="/create">
             <Button className="rounded-full" size="icon">
               <Plus />
             </Button>
           </Link>
         </div>
         <div className="flex flex-col gap-3 items-center border-t border-white pt-3">
           <Link href="/settings">
             <Button size="icon" className="rounded-full">
               <Settings />
             </Button>
           </Link>
           <Button size="icon" className="rounded-full bg-red-600">
             <LogOut />
           </Button>
         </div>
       </aside>
     );
}
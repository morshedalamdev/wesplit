import Link from "next/link";

export default function Navbar () {
     return (
       <nav className="flex flex-wrap items-center justify-between px-2 pt-px">
         <h2 className="x-group-title">Group Name</h2>
         <ul className="flex items-center gap-2">
           <li>
             <Link className="x-nav-item x-nav-active" href={`/group/1/expenses`}>expenses</Link>
           </li>
           <li>
             <Link className="x-nav-item" href={`/group/1/members`}>members</Link>
           </li>
           <li>
             <Link className="x-nav-item" href={`/group/1/settings`}>settings</Link>
           </li>
         </ul>
       </nav>
     );
}
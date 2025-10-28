import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
const todayString = new Date().toLocaleDateString('en-US', {
     month: 'long',
     day: 'numeric',
     year: 'numeric',
});

     return (
       <>
         <section className="flex flex-col gap-3 p-2 mb-12">
          
         <div className="flex items-center justify-between">
           <h3 className="font-bold">{todayString}</h3>
           <div className="flex items-center gap-3">
             <p>
               Currency: <b>CNY</b>
             </p>
             <p>
               Split: <b>Equal</b>
             </p>
           </div>
         </div>
         {children}</section>
         <Navbar />
       </>
     );
}
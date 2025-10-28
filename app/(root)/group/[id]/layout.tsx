import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
     return (
       <>
         <section className="p-2 mb-12">{children}</section>
         <Navbar />
       </>
     );
}
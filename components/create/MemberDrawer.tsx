"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function MemberDrawer () {
     return (
       <Drawer>
         <DrawerTrigger asChild>
           <Button>Add New Member</Button>
         </DrawerTrigger>
         <DrawerContent>
           <DrawerHeader>
             <DrawerTitle>Add New Member</DrawerTitle>
           </DrawerHeader>
           <FieldGroup className="px-4">
             <Field>
               <FieldLabel htmlFor="email">Email</FieldLabel>
               <Input id="email" type="email" placeholder="m@example.com" />
             </Field>
             <Field>
               <FieldLabel htmlFor="role">role</FieldLabel>
               <Select defaultValue="viewer">
                 <SelectTrigger id="role">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="viewer">viewer</SelectItem>
                   <SelectItem value="editor">editor</SelectItem>
                   <SelectItem value="contributor">contributor</SelectItem>
                   <SelectItem value="admin">admin</SelectItem>
                 </SelectContent>
               </Select>
             </Field>
           </FieldGroup>
           <DrawerFooter>
             <Button>Submit</Button>
             <DrawerClose asChild>
               <Button variant="outline" className="w-full">
                 Cancel
               </Button>
             </DrawerClose>
           </DrawerFooter>
         </DrawerContent>
       </Drawer>
     );
}
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function GroupDrawer () {
     return (
       <Drawer>
         <DrawerTrigger asChild>
           <Button className="rounded-full" size="icon">
             <Plus />
           </Button>
         </DrawerTrigger>
         <DrawerContent>
           <DrawerHeader>
             <DrawerTitle>Create New Group</DrawerTitle>
           </DrawerHeader>
           <FieldGroup className="px-4">
             <Field>
               <FieldLabel htmlFor="name">name</FieldLabel>
               <Input id="name" type="text" placeholder="New Group" />
             </Field>
             <div className="grid grid-cols-2 gap-3">
               <Field>
                 <FieldLabel htmlFor="currency">Default Currency</FieldLabel>
                 <Select defaultValue="cny">
                   <SelectTrigger id="currency">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="usd">USD</SelectItem>
                     <SelectItem value="cny">CNY</SelectItem>
                     <SelectItem value="eur">EUR</SelectItem>
                     <SelectItem value="bdt">BDT</SelectItem>
                   </SelectContent>
                 </Select>
               </Field>
               <Field>
                 <FieldLabel htmlFor="split">Default Split</FieldLabel>
                 <Select defaultValue="equal">
                   <SelectTrigger id="split">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="equal">Equal</SelectItem>
                     <SelectItem value="exact">Exact</SelectItem>
                     <SelectItem value="percentage">Percentage</SelectItem>
                   </SelectContent>
                 </Select>
               </Field>
             </div>
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
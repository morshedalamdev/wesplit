"use client";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/datePicker";
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

export default function ExpenseDrawer () {
     return (
       <Drawer>
         <DrawerTrigger asChild>
           <Button>Add New Expense</Button>
         </DrawerTrigger>
         <DrawerContent>
           <DrawerHeader>
             <DrawerTitle>Add New Expense</DrawerTitle>
           </DrawerHeader>
           <FieldGroup className="px-4">
             <Field>
               <FieldLabel htmlFor="title">title</FieldLabel>
               <Input id="title" type="text" placeholder="Hotel Rent..." />
             </Field>
             <div className="grid grid-cols-2 gap-3">
               <Field>
                 <FieldLabel htmlFor="amount">amount</FieldLabel>
                 <Input id="amount" type="number" placeholder="0,00.00" />
               </Field>
               <Field>
                 <FieldLabel htmlFor="date">date</FieldLabel>
                 <DatePicker id="date" />
               </Field>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <Field>
                 <FieldLabel htmlFor="receipt">receipt</FieldLabel>
                 <Input id="receipt" type="file" />
               </Field>
               <Field>
                 <FieldLabel htmlFor="split">Split Method</FieldLabel>
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
             <DrawerClose asChild>
               <Button disabled={isPending} type="submit" className="w-full">
                 {isPending ? <Spinner /> : ""}Add
               </Button>
             </DrawerClose>
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
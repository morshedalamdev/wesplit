import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Settings () {
     return (
       <FieldGroup>
         <FieldGroup className="px-4">
           <Field className="w-fit">
             <FieldLabel htmlFor="avatar">
               <Image
                 src="/icon.png"
                 alt="User Avatar"
                 width={60}
                 height={60}
                 className="rounded-md mb-2"
               />
             </FieldLabel>
             <Input
               id="avatar"
               type="file"
               accept="image/*"
               className="hidden"
             />
           </Field>
           <div className="grid grid-cols-2 gap-3">
             <Field>
               <FieldLabel htmlFor="name">name</FieldLabel>
               <Input id="name" type="text" />
             </Field>
             <Field>
               <FieldLabel htmlFor="email">Email</FieldLabel>
               <Input id="email" type="email" placeholder="m@example.com" />
             </Field>
           </div>
           <div className="grid grid-cols-2 gap-3">
             <Field>
               <FieldLabel htmlFor="phone">phone</FieldLabel>
               <Input id="phone" type="tel" placeholder="+86 123 1234 1234" />
             </Field>               
           </div>
           <Field>
             <FieldLabel htmlFor="notes">notes</FieldLabel>
             <Textarea
               id="notes"
               placeholder="any additional notes..."
               className="resize-none"
             />
           </Field>
           <Field orientation="horizontal">
             <Button type="submit">Update</Button>
           </Field>
         </FieldGroup>
       </FieldGroup>
     );
}
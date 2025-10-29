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
           <div className="flex gap-3">
             <Field className="w-fit">
               <FieldLabel htmlFor="avatar">
                 <Image
                   src="/icon.png"
                   alt="Group Avatar"
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
             <Field>
               <FieldLabel htmlFor="name">name</FieldLabel>
               <Input id="name" type="text" />
             </Field>
           </div>
           <div className="grid grid-cols-2 gap-3">
             <Field>
               <FieldLabel htmlFor="currency">Default Currency</FieldLabel>
               <Select defaultValue="cny">
                 <SelectTrigger id="currency">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="cny">CNY</SelectItem>
                   <SelectItem value="usd">USD</SelectItem>
                   <SelectItem value="bdt">BDT</SelectItem>
                   <SelectItem value="eur">EUR</SelectItem>
                 </SelectContent>
               </Select>
             </Field>
             <Field>
               <FieldLabel htmlFor="split">Default Split Method</FieldLabel>
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
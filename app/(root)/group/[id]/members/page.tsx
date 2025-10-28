import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Members () {
     return (
       <div className="x-bg-glass-dark">
         <div className="flex items-center justify-between p-2 border-b border-gray-200">
           <h3 className="font-medium text-sm">Members</h3>
           <div className="flex items-center gap-2">
             <Select defaultValue="01">
               <SelectTrigger id="checkout-exp-month-ts6" className="w-40">
                 <SelectValue placeholder="MM" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="01">01</SelectItem>
                 <SelectItem value="02">02</SelectItem>
                 <SelectItem value="03">03</SelectItem>
                 <SelectItem value="04">04</SelectItem>
                 <SelectItem value="05">05</SelectItem>
                 <SelectItem value="06">06</SelectItem>
                 <SelectItem value="07">07</SelectItem>
                 <SelectItem value="08">08</SelectItem>
                 <SelectItem value="09">09</SelectItem>
                 <SelectItem value="10">10</SelectItem>
                 <SelectItem value="11">11</SelectItem>
                 <SelectItem value="12">12</SelectItem>
               </SelectContent>
             </Select>
             <Button>Add</Button>
           </div>
         </div>
         <Table>
           <TableHeader>
             <TableRow>
               <TableHead>Sl</TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Role</TableHead>
               <TableHead>Join</TableHead>
               <TableHead>Spent</TableHead>
               <TableHead>Settle</TableHead>
               <TableHead>Due</TableHead>
               <TableHead className="w-24">Action</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             <TableRow>
               <TableCell>1</TableCell>
               <TableCell>John Doe</TableCell>
               <TableCell>Viewer</TableCell>
               <TableCell>October 13, 2025</TableCell>
               <TableCell>250.00/-</TableCell>
               <TableCell>100.00/-</TableCell>
               <TableCell>150.00/-</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button>|
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow>
             <TableRow>
               <TableCell>2</TableCell>
               <TableCell>Jane Smith</TableCell>
               <TableCell>Editor</TableCell>
               <TableCell>November 5, 2025</TableCell>
               <TableCell>300.00/-</TableCell>
               <TableCell>150.00/-</TableCell>
               <TableCell>150.00/-</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button>|
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow>
             <TableRow>
               <TableCell>3</TableCell>
               <TableCell>Mike Johnson</TableCell>
               <TableCell>Admin</TableCell>
               <TableCell>December 1, 2025</TableCell>
               <TableCell>400.00/-</TableCell>
               <TableCell>200.00/-</TableCell>
               <TableCell>200.00/-</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button>|
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow>
             <TableRow>
               <TableCell>4</TableCell>
               <TableCell>Emily Davis</TableCell>
               <TableCell>Viewer</TableCell>
               <TableCell>January 10, 2026</TableCell>
               <TableCell>300.00/-</TableCell>
               <TableCell>100.00/-</TableCell>
               <TableCell>200.00/-</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button>|
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow>
             <TableRow>
               <TableCell>5</TableCell>
               <TableCell>Sarah Wilson</TableCell>
               <TableCell>Editor</TableCell>
               <TableCell>February 15, 2026</TableCell>
               <TableCell>350.00/-</TableCell>
               <TableCell>150.00/-</TableCell>
               <TableCell>200.00/-</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button>|
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow>
           </TableBody>
         </Table>
       </div>
     );
}
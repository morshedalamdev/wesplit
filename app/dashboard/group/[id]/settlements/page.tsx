import SettleDrawer from "@/components/create/SettleDrawer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Settlements() {
  return (
    <div className="x-bg-glass-dark">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <h3 className="font-medium text-sm">Settlements</h3>
        <div className="flex items-center gap-2">
          <SettleDrawer />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Lunch</TableCell>
            <TableCell>150.00/-</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>Wechat</TableCell>
            <TableCell>October 13, 2025</TableCell>
            <TableCell className="flex gap-2">
              <button className="text-amber-500">Edit</button>|
              <button className="text-red-500">Delete</button>
            </TableCell>
          </TableRow>
          <TableRow>
               <TableCell>2</TableCell>
               <TableCell>Office Supplies</TableCell>
               <TableCell>300.00/-</TableCell>
               <TableCell>Jane Smith</TableCell>
               <TableCell>John Doe</TableCell>
               <TableCell>Paypal</TableCell>
               <TableCell>November 5, 2025</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button> |{" "}
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow>
             <TableRow>
               <TableCell>3</TableCell>
               <TableCell>Team Outing</TableCell>
               <TableCell>500.00/-</TableCell>
               <TableCell>John Doe</TableCell>
               <TableCell>Jane Smith</TableCell>
               <TableCell>Bank Transfer</TableCell>
               <TableCell>December 12, 2025</TableCell>
               <TableCell className="flex gap-2">
                 <button className="text-amber-500">Edit</button> |{" "}
                 <button className="text-red-500">Delete</button>
               </TableCell>
             </TableRow> 
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-2 border-t border-gray-200">
        <p className="text-muted-foreground">1-20 expenses are showing</p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            className="text-muted-foreground"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="text-muted-foreground"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

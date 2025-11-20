import { SettlementType } from "@/lib/types";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";

export default function SettleView ({data}:{data: SettlementType}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-green-500">View</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settlement Details</DrawerTitle>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-3 px-3">
          <p className="col-span-2">
            <b>Title: </b>
            {data.title}
          </p>
          <p>
            <b>From: </b>
            {data.fromUser}
          </p>
          <p>
            <b>To: </b>
            {data.toUser}
          </p>
          <p>
            <b>Amount: </b>
            {data.amount}/-
          </p>
          <p>
            <b>Currency: </b>
            <span className="uppercase">{data.currency}</span>
          </p>
          <p>
            <b>Method: </b>
            <span className="capitalize">{data.method}</span>
          </p>
          <p>
            <b>Date: </b>
            {data.settledAt}
          </p>
          {data?.notes && (
            <p className="col-span-2">
              <b>Notes: </b>
              {data.notes}
            </p>
          )}
        </div>
        <DrawerFooter>
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
"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { ExpenseType } from "@/lib/types";
import { Button } from "./ui/button";

export default function ExpenseView ({data}:{data: ExpenseType}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="text-green-500">View</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Expense Details</DrawerTitle>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-3 px-3">
          <p className="col-span-2">
            <b>Title: </b>
            {data.title}
          </p>
          <p>
            <b>Payer: </b>
            {data.payer}
          </p>
          <p>
            <b>Split Method: </b>
            {data.split}
          </p>
          <p>
            <b>Amount: </b>
            {data.amount}/-
          </p>
          <p>
            <b>Owed: </b>
            {data.owed}/-
          </p>
          <p>
            <b>Quantity: </b>
            {data.quantity ? data.quantity : "---"}
          </p>
          <p>
            <b>Date: </b>
            {data.date}
          </p>
          {data?.notes && (
            <p className="col-span-2">
              <b>Notes: </b>
              {data.notes}
            </p>
          )}
          {data?.receipt && (
            <div className="col-span-2 flex gap-1">
              <b>Receipt: </b>
              <img
                src={`data:image/jpeg;base64,${data.receipt}`}
                alt={data.title}
                className="max-w-3/4 w-60 mx-auto"
              />
            </div>
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
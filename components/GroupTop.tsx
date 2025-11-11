"use client";

import { useGroup } from "@/contexts/groupContext";
import formatDate from "@/lib/utils/formatDate";
import { usePathname } from "next/navigation";

export default function GroupTop() {
  const {group} = useGroup();
  const pathname = usePathname();
  const todayString = formatDate(new Date());

  return (
    !pathname.endsWith("settings") && (
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{todayString}</h3>
        <div className="flex items-center gap-3">
          <p>
            Currency: <b className="uppercase">{group?.settings?.currency}</b>
          </p>
          <p>
            Split: <b className="capitalize">{group?.settings?.defaultSplit}</b>
          </p>
        </div>
      </div>
    )
  );
}

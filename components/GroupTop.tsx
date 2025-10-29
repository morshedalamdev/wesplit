"use client";

import { usePathname } from "next/navigation";

export default function GroupTop() {
  const pathname = usePathname();
  const todayString = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    !pathname.endsWith("settings") && (
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{todayString}</h3>
        <div className="flex items-center gap-3">
          <p>
            Currency: <b>CNY</b>
          </p>
          <p>
            Split: <b>Equal</b>
          </p>
        </div>
      </div>
    )
  );
}

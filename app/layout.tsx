import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { UserProvider } from "@/contexts/userContext";
import { GroupProvider } from "@/contexts/groupContext";
import { ExpenseProvider } from "@/contexts/expenseContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wesplit",
  description: "Manage and split expenses with friends easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <UserProvider>
          <GroupProvider>
            <ExpenseProvider>
              {children}
              <Toaster />
            </ExpenseProvider>
          </GroupProvider>
        </UserProvider>
      </body>
    </html>
  );
}
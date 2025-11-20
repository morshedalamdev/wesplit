import { Spinner } from "@/components/ui/spinner";

export default function Loading () {
     return (
       <div className="flex min-h-screen items-center justify-center">
         <div className="flex flex-col items-center space-y-4">
           <Spinner />
           <p className="text-gray-600">Loading...</p>
         </div>
       </div>
     );
}
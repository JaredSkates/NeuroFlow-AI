import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import Link from 'next/link';


// 

export default function Home() {
  return (
    <div className="bg-gradient-to-br min-h-screen from-blue-50 to-gray-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-semibold text-7xl text-center">
            NeuroFlow AI 
            <span className="text-blue-300 font-bold"><br/>Assisted Note Taking.</span>
            
            <div className="mt-4"></div>
          </h1>
          <h2 className="font-semibold text-3xl text-center text-white">
              <TypewriterTitle />
          </h2>

          <div className="mt-8"></div>

          <Link href={'/dashboard'} className="flex justify-center">
            <Button className="bg-blue-300 cursor-pointer" >
              Ready to Dive In?
              <ArrowDownRight className="w-5 h-5 strokeWidth={3}"></ArrowDownRight>
            </Button>
          </Link>
      </div>
    </div>
  );
}

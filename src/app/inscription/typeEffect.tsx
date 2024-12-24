"use client";
import { TypewriterEffectSmooth } from "@/app/(component)/ui/typeWritterEffect";

export default function TypewriterEffect({words}:{words:{text:string,className?:string}[]}) {

  return (
    <div className="flex flex-col items-center justify-center mt-10 h-[200px]">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

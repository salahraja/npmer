import { useState } from "react";

interface CopyButtonProps {
  text: string;
  onCopy: (text: string) => void;
}

export default function CopyButton({ text, onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onCopy(text);
    setCopied(true);
  };

  return (
    <span
      className="relative rounded-md inline-flex items-center justify-start px-2 py-1 overflow-hidden font-medium transition-all dark:bg-white bg-white hover:bg-white group"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <span className="w-48 h-48 rotate-[-40deg] bg-black absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left transition-colors duration-300 ease-in-out group-hover:text-white text-black">
        {copied ? "Copied!" : "Copy"}
      </span>
    </span>
  );
}

// import React from 'react'
import { twMerge } from "tailwind-merge";
import { cn } from "../../lib/utilities";

function Button({ title,icon, onClick, disabled, loading,type, className }) {
  return (
    <button
    type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(`bg-buttonColor flex justify-center gap-1  rounded-lg border  px-6 py-2 text-textPrimary transition-all hover:text-textPrimary`,
        className,
        {
          "pointer-events-none select-none bg-red-900 bg-opacity-50 ":
            loading || disabled,
        },
      )}
    >
      <span className="">{title}</span>
     <span className="relative md:top-[0px] lg:top-1 xs:top-1 text-lg"> {icon}</span>
    </button>
  );
}

export default Button;

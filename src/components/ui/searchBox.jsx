import { cn } from "../../lib/utilities";

export default function SearchBox({ placeholder,icon,type, className }) {
  return (
    <main >
      <div className={cn(`relative p-2 w-full max-w-md`,className)}>
        <span className="absolute right-6 top-5 text-color6 h-5 w-5 " >{icon}</span>
        <input
        type={type}
          dir="rtl"
        placeholder={placeholder}
          className="w-full h-10 pr-10 pl-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>
    </main>
  )
}
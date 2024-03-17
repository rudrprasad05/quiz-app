import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuid() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    crypto.getRandomValues(new Uint8Array(1))[0].toString(16)
  );
}

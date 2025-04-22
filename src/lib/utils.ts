import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeJWT(token?: string | null) {
  if (!token) {
    return null;
  }
  const payloadBase64 = token.split(".")[1];
  const payload = atob(payloadBase64); // decode base64
  return JSON.parse(payload);
}

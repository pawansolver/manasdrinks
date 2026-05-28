"use client";

import { useRouter, useParams as useNextParams, usePathname } from 'next/navigation';

export function useNavigate() {
  const router = useRouter();
  return (path: string) => {
    router.push(path);
  };
}

export function useParams() {
  return useNextParams();
}

export function useLocation() {
  const pathname = usePathname();
  return {
    pathname,
  };
}

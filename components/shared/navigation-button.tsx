"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NavigationButton({
  href,
  children,
  size,
}: {
  href: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(href);
  };

  return (
    <Button variant="outline" size={size} onClick={handleNavigation}>
      {children}
    </Button>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OdemePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("https://app.superajan.com/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted">Yönlendiriliyor...</p>
    </div>
  );
}

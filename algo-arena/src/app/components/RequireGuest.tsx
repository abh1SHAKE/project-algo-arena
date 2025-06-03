"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoaderScreen from "./LoaderScreen/LoaderScreen";

export default function RequireGuest({ children }: { children: React.ReactNode }) {
  const { currentUser, isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace("/arenas");
    }
  }, [currentUser, isLoading, router]);

  if (isLoading || (!isLoading && currentUser)) {
    return <LoaderScreen></LoaderScreen>
  }

  return <>{children}</>;
}

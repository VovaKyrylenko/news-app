"use client";

import { restoreNews } from "@/actions/restore-news";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";

type RestoreButtonProps = {
  id: number;
};

export const RestoreButton = ({ id }: RestoreButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      const response = await restoreNews(id);
      if (!response.success) {
        toast({ title: response.error });
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to restore news, try again later!",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleRestore} variant="outline" disabled={isLoading}>
      <>
        <RefreshCcw
          className={clsx(" mr-2 h-4 w-4", isLoading && "animate-spin")}
        />
        Restore
      </>
    </Button>
  );
};

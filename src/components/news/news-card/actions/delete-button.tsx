"use client";

import { deleteNews } from "@/actions/delete-news";
import { Button } from "@/components/ui/button";
import { Trash, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type DeleteButtonProps = {
  id: number;
};

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteNews(id);
      if (!response.success) {
        toast({ title: response.error });
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "Failed to delete news, try again later!",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      size="icon"
      variant="destructive"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader className="animate-spin h-4 w-4" />
      ) : (
        <Trash className="h-4 w-4" />
      )}
    </Button>
  );
};

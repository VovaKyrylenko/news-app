"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { updateNews } from "@/actions/update-news";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateNews, updateNewsSchema } from "@/validation/update-news";

interface EditButtonProps {
  id: number;
  title: string;
  description: string;
}

export const EditButton = ({ id, title, description }: EditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateNews>({
    defaultValues: { title, description },
    resolver: zodResolver(updateNewsSchema),
  });

  const onSubmit = async (data: UpdateNews) => {
    setIsLoading(true);
    try {
      const response = await updateNews(id, data);
      if (!response.success) {
        toast({ title: response.error });
      }
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      toast({ title: "Failed to update news, try again later!" });
      console.error("Failed to update news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit News</DialogTitle>
          <DialogDescription>
            Update the details of the news item here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              className="col-span-3"
              placeholder="Enter the title"
            />
            {errors.title && (
              <p className="text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="col-span-3"
              placeholder="Enter the description"
            />
            {errors.description && (
              <p className="text-destructive">{errors.description.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className={clsx(
                "w-full",
                isLoading && "opacity-50 cursor-not-allowed",
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

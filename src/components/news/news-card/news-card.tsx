import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { Card, CardHeader, CardContent, CardFooter } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { CardActions } from "./actions/card-actions";

type NewsCardProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  pubDate: Date;
  isAdmin?: boolean;
  isDeleted?: boolean;
};

export const NewsCard = ({
  id,
  title,
  description,
  imageUrl,
  link,
  pubDate,
  isAdmin = false,
  isDeleted = false,
}: NewsCardProps) => {
  return (
    <Card className="w-full h-full flex flex-col rounded overflow-hidden shadow-lg relative">
      <CardActions
        id={id}
        title={title}
        description={description}
        isAdmin={isAdmin}
        isDeleted={isDeleted}
      />
      <CardHeader className="p-0 relative">
        <Image
          src={imageUrl}
          width={400}
          height={200}
          alt={title}
          className={clsx("w-full object-cover", {
            "filter grayscale": isDeleted,
          })}
        />
      </CardHeader>
      <CardContent className={clsx("flex-1 pt-6", { "opacity-50": isDeleted })}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-base mt-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-end">
        <p className="text-gray-500 text-sm">
          {new Date(pubDate).toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "2-digit",
          })}
        </p>
        <div className="flex items-center space-x-2">
          <Button asChild disabled={isDeleted}>
            <Link href={link}>
              Read more
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

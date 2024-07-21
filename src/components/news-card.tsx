import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type NewsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  pubDate: string;
};

export const NewsCard = ({
  title,
  description,
  imageUrl,
  link,
  pubDate,
}: NewsCardProps) => {
  return (
    <Card className="max-w-sm rounded overflow-hidden shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          width={400}
          height={200}
          alt={title}
          className="w-full object-fill"
        />
      </CardHeader>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className=" text-base mt-2">{description}</p>
      </CardContent>
      <CardFooter className="justify-between items-end">
        <p className="text-gray-500 text-sm text-end">
          {new Date(pubDate).toLocaleDateString([], {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
        <Button asChild>
          <Link href={link}>
            Read more
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

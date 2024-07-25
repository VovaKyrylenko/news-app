import { EditButton } from "./edit-button";
import { DeleteButton } from "./delete-button";
import { RestoreButton } from "./restore-button";

interface CardActionsProps {
  id: number;
  title: string;
  description: string;
  isAdmin?: boolean;
  isDeleted?: boolean;
}

export const CardActions: React.FC<CardActionsProps> = ({
  id,
  title,
  description,
  isAdmin = false,
  isDeleted = false,
}) => {
  if (isAdmin) {
    if (isDeleted) {
      return (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center w-full h-full z-20">
          <RestoreButton id={id} />
        </div>
      );
    }
    return (
      <div className="absolute top-2 right-2 flex space-x-2 z-20">
        <EditButton id={id} title={title} description={description} />
        <DeleteButton id={id} />
      </div>
    );
  }
  return null;
};

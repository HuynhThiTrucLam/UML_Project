import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emptyFields: string[];
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  onOpenChange,
  emptyFields,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Thông tin chưa đầy đủ
          </DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ các trường thông tin sau:
            <ul className="list-disc pl-4 mt-2">
              {emptyFields.map((field, index) => (
                <li key={index} className="text-red-400">
                  {field}
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;

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

type CommentDialogType = {
  comment: string;
};

export function CommentDialog({ comment }: CommentDialogType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-full bg-slate-200 bg-opacity-85 font-bold"
        >
          もっと読む
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%] h-3/4 bg-grayThemeColor">
        <DialogHeader>
          <DialogTitle>スタッフからのコメント</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-scroll flex justify-center p-2 ">
          <p className="whitespace-pre-wrap">{comment}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

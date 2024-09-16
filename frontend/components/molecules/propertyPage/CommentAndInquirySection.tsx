import { CommentDialog } from "@/components/organisms/propertyPage/CommentDialog";
import { Button } from "@/components/ui/button";
import { FC } from "react";

type CommentAndInquirySectionProps = {
  inquiryForm: string;
  comment: string;
};
const CommentAndInquirySection: FC<CommentAndInquirySectionProps> = ({
  comment,
  inquiryForm,
}) => {
  return (
    // <div className="p-5 h-full">
    <>
      <div className="relative h-[80%] overflow-y-hidden flex justify-center">
        <p className="whitespace-pre-wrap">{comment}</p>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center font-bold h-[15%] sm:h-[10%] ">
          <CommentDialog comment={comment} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-2 h-[10%]">
        {/* 一時的にコメントアウト */}
        {/* <Button vocab="outline">
          <a href={inquiryForm} target="_blank">
            お問い合わせ
          </a>
        </Button> */}
      </div>
    </>
    // </div>
  );
};

export default CommentAndInquirySection;

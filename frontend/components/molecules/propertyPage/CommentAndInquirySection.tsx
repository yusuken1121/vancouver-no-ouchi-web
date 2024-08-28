import { Button } from "@/components/ui/button";
import { FC } from "react";

type CommentAndInquirySectionProps = {
  inquiryForm: string;
};
const CommentAndInquirySection: FC<CommentAndInquirySectionProps> = ({
  inquiryForm,
}) => {
  return (
    <div>
      <Button vocab="outline">
        <a href={inquiryForm} target="_blank">
          お問い合わせ
        </a>
      </Button>
    </div>
  );
};

export default CommentAndInquirySection;

import { FC } from "react";
import { Spinner } from "@/components/UI/Loading";

interface SingleImageUploadLoadingProps {}

const SingleImageUploadLoading: FC<SingleImageUploadLoadingProps> = () => {
  return (
    <div className="group-loading">
      <Spinner />
    </div>
  );
};

export default SingleImageUploadLoading;

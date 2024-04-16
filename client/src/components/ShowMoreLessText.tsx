import React, { PropsWithChildren, useState } from "react";

const ShowMoreLessText = (props: PropsWithChildren) => {
  const [isShow, setIsShow] = useState(false);

  const label = React.useMemo(
    () => (isShow ? "Show less" : "Show more"),
    [isShow]
  );

  return (
    <div>
      <div
        className={`transition overflow-hidden ${!isShow && "max-h-[100px]"} `}
      >
        {props.children}
      </div>
      <div className="flex justify-center">
        <div
          onClick={() => setIsShow(!isShow)}
          className="text-center my-2 text-base border-dotted border-t-2 border-primary w-[200px] cursor-pointer"
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default ShowMoreLessText;

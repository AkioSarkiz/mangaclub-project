import { PropsWithChildren, useState, useEffect } from "react";

interface MFloatProps {
  position:
    | "bottom-right-corner"
    | "bottom-left-corner"
    | "top-right-corner"
    | "top-left-corner"
    | "center"
    | "bottom-center";
}

const MFloat = ({ position, children }: PropsWithChildren<MFloatProps>) => {
  const [classes, setClasses] = useState<string>("");

  useEffect(() => {
    switch (position) {
      case "bottom-right-corner":
        setClasses("bottom-4 right-4");
        break;
      case "bottom-left-corner":
        setClasses("bottom-4 left-4");
        break;
      case "top-right-corner":
        setClasses("top-4 right-4");
        break;
      case "top-left-corner":
        setClasses("top-4 left-4");
        break;
      case "center":
        setClasses(
          "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        );
        break;
      case "bottom-center":
        setClasses("bottom-4 left-1/2 transform -translate-x-1/2");
        break;
      default:
        console.error("Not found position");
        setClasses("hidden");
        break;
    }
  }, [position]);

  return <div className={`fixed ${classes}`}>{children}</div>;
};

export default MFloat;

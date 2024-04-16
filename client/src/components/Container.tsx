import { PropsWithChildren } from "react";

export default function Container(props: PropsWithChildren) {
  return <div className="container">{props.children}</div>;
}

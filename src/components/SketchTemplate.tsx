import React from "react";
import dynamic from "next/dynamic";
import { SketchProps } from "react-p5";

const Sketch = dynamic(import("react-p5"), {
  loading: () => <></>,
  ssr: false,
});

export const SketchTemplate: React.VFC<SketchProps> = (props: SketchProps) => {
  return <Sketch {...props} />;
};

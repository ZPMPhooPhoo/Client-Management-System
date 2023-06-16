import React from "react";

type LabelProps = {
  htmlFor: string;
  text: string;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return <label className="label" htmlFor={htmlFor}>{text}</label>;
};
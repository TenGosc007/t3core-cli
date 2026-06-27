import { s } from "@/utils/styledLabel";

export type InputErrorMessageUIProps = {
  error: string | null;
};

export const InputErrorMessageUI = ({ error }: InputErrorMessageUIProps) => {
  if (error == null) return;

  console.log(s.red(error));
  console.log("\t");
};

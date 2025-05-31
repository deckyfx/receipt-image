import { type Alignment, ALIGNMENTS } from "@src/types";
import RadioSelector from "./RadioSelector";

type Props = {
  value?: Alignment;
  name?: string;
  onChange: (align: Alignment) => void;
};

export default function AlignmentSelector({ name, value, onChange }: Props) {
  return (
    <RadioSelector
      title="Alignment"
      onChange={onChange}
      name={name || "alignment"}
      selections={ALIGNMENTS}
      value={value || "left"}
    />
  );
}

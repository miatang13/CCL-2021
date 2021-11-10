import { icon_info } from "../data/iconInfo";
import IconMatrix from "./IconMatrix";

export default function MatrixQuadrant() {
  return (
    <div>
      <p> Matrix Component </p>
      {icon_info.map((indivData, i) => (
        <IconMatrix data={indivData} key={i} />
      ))}
    </div>
  );
}

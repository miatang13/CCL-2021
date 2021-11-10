import icon_data from "../data/iconInfo.json";
import IconMatrix from "./IconMatrix";

export default function MatrixQuadrant() {
  const baseUrl = "/assets/img/matrixIcon/";

  return (
    <div>
      <p> Matrix Component </p>
      {icon_data.map((indivData, i) => (
        <IconMatrix
          name={indivData.name}
          location={indivData.location}
          img_src={baseUrl + indivData.img_src}
          blurb={indivData.blurb}
          key={i}
        />
      ))}
    </div>
  );
}

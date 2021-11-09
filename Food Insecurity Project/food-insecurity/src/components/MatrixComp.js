import IconMatrix from "./IconMatrix";
import testIcon from "../assets/img/matrixIcon/test.png";

export default function MatrixComp() {
  const testData = {
    img_src: testIcon,
    name: "Terri",
    location: "Phoenix, AZ",
    blurb:
      "Terri's great life suddenly vanished when her job disappeared and she needed help from the food pantry at her local church. Now that she's back on her feet, she's a regular volunteer at the pantry that helped stabilize her life.",
  };
  return (
    <div>
      <p> Matrix Component </p>
      <IconMatrix data={testData} />
    </div>
  );
}

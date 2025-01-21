import SectionOne from "../sections/section-one/SectionOne";
import SectionTwo from "../sections/section-two/SectionTwo";
import "./Main.css";

const Main = ({ hideDone }) => {
  return (
    <main>
      <SectionOne />
      <SectionTwo hideDone={hideDone} />
    </main>
  );
};

export default Main;

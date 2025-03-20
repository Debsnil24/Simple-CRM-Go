import Heading from "./components/heading";
import LeadList from "./components/LeadList";

const App = () => {
  return (
    <>
      <div className="heading-container">
        <Heading />
      </div>
      <div>
        <LeadList />
      </div>
    </>
  );
};

export default App;

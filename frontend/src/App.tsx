import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Heading from "./components/heading";
import LeadList from "./components/LeadList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <div className="heading-container">
        <Heading />
      </div>
      <div>
        <LeadList />
        </div>
        </QueryClientProvider>
    </>
  );
};

export default App;

import { useEffect } from "react";
import Notifications from "./components/Notifications";
import axios from "axios";
import { PORTURL } from "./services/common";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PORTURL);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [PORTURL]);

  return (
    <div className="p-16 h-[100vh]">
      <Notifications />
    </div>
  );
}

export default App;

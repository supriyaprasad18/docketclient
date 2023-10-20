import "./App.css";
import { useState, useEffect } from "react";
import DocketForm from "./modules/createDocket";
import DocketList from "./modules";

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [refresh,setRefresh]=useState(true);

  useEffect(() => {
    fetch("https://dockets.onrender.com/getFileData")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding:'2rem'
      }}
    >
      <h1>DOCKET LISTS</h1>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "#0000ff5c",
          borderRadius: "2rem",
          padding: "0.25rem",
        }}
      >
        Create Docket
      </button>
      <DocketList refresh={refresh} setRefresh={setRefresh}/>
      <DocketForm open={open} onClose={() => setOpen(false)} data={data} setRefresh={setRefresh}/>
    </div>
  );
}

export default App;

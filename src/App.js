import "./App.css";
import { useState, useEffect } from "react";
import DocketForm from "./modules/createDocket";
import DocketList from "./modules";

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dockets, setDockets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await fetch("https://dockets.onrender.com/getDocketList")
      .then((response) => response.json())
      .then((data) => setDockets(data))
      .catch((err) => console.log(err));
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
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
      <DocketList dockets={dockets} loading={loading}/>
      <DocketForm open={open} onClose={() => setOpen(false)} data={data} fetchData={fetchData}/>
    </div>
  );
}

export default App;

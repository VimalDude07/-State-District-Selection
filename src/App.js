import "./App.css";
import Modal1 from "./Modal";

// export const modalContext = createContext();

function App1() {
  const location = [
    {
      state: "Tamilnadu",
      districts: ["Chennai", "Thiruvallur", "Coimbatore", "salem", "Madurai"],
    },

    {
      state: "Kerala",
      districts: ["Aplappuzha", "Idukki", "Palakkad", "Kochi", "Wayanad"],
    },

    {
      state: "Karnataka",
      districts: ["Mysore", "Udupi", "Bangalore", "Koppal", "Tumakuru"],
    },
    {
      state: "AndhraPradesh",
      districts: ["Nellore", "Chittor", "Guntur", "Tiupati", "Visakhapatnam"],
    },
    {
      state: "Dehli",
      districts: ["East delhi", "New delhi", "Shahdara", "North delhi"],
    },
    {
      state: "Goa",
      districts: [
        "East Goa",
        "South Goa",
        "vakabeach",
        "North Goa",
        "West goa",
        "centeral Goa",
      ],
    },
  ];
 

  localStorage.setItem("location", JSON.stringify(location));


  return (
    <>
      <div>
        <Modal1 />
      </div>
    </>
  );
}
export default App1;
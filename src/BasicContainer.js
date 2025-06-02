import { useState, useEffect } from "react";
import cancelImg from "./ImgReact/XCircle.png";
// import { modalContext } from "./App1";
function BasicContainer({
  setModal,
  setStateDistrictData,
  setIndex,
  setShowAllData,
}) {
  const [openData, setOpenData] = useState(false);

  const location = JSON.parse(localStorage.getItem("location"));

  const showAllData = JSON.parse(localStorage.getItem("showAllData")) || [];
  console.log(showAllData, "1");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("openData"));
    if (savedData === true) {
      setOpenData(true);
    }
  }, []);
  const openButton = (event) => {
    const checked = event.target.checked;
    setOpenData(checked);
    localStorage.setItem("openData", JSON.stringify(checked));
  };

  const openModal = () => {
    if (showAllData.length > 0) {
      const newData = [...showAllData];
      setStateDistrictData(newData);
    }

    setModal(true);
  };

  const HandleRemoveDistrictData = (stateValue, districtValue, i) => {
    const removeIndex = location.findIndex((el) => el.state === stateValue);
    setIndex(removeIndex);

    const updatedData = showAllData
      .map((state) =>
        state.stateName === stateValue
          ? {
              ...state,
              districtName: state.districtName.filter(
                (district) => district !== districtValue
              ),
            }
          : state
      )
      .filter((state) => state.districtName.length > 0);

    localStorage.setItem("index", JSON.stringify(removeIndex));
    localStorage.setItem("stateDistrictData", JSON.stringify(updatedData));
    localStorage.setItem("showAllData", JSON.stringify(updatedData));
    setShowAllData(updatedData);
  };

  useEffect(() => {
    const indexData = JSON.parse(localStorage.getItem("index"));
    if (showAllData.length > 0) {
      const newData = [...showAllData];
      setStateDistrictData(newData);
      setIndex(indexData);
    }
  }, []);

  const statelength = showAllData.map((state) => state.stateName);
  const allDistrictLength = showAllData.map((id) => id.districtName.length);
  let totalDistricts = 0;
  allDistrictLength.forEach((el) => {
    totalDistricts += el;
  });
  return (
    <>
      <div className="openDisplay">
        <div className="heading">
          <input
            className="headingInput"
            type="checkbox"
            checked={openData}
            onChange={(event) => openButton(event)}
            id="open"
          />
          <label htmlFor="open" className="headingText">
            Geographical
          </label>
        </div>
        <div className="title">
          <div className="titleText">Inclusion</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              onClick={openModal}
              disabled={!openData}
              className="titleBtn"
              style={{
                opacity: !openData ? "0.5" : "",
                cursor: openData ? "pointer" : "not-allowed",
              }}
            >
              {showAllData.length > 0 ? "Modify Selection" : "Select States"}
            </button>
            <p
              className="allcount"
              style={{ display: showAllData.length > 0 ? "block" : "none" }}
            >
              {statelength.length} States / {totalDistricts} District
            </p>
          </div>
          <p
            style={{ display: showAllData.length === 0 ? "block" : "none" }}
            className="tilteLastText"
          >
            All are selected unless specified
          </p>
          <div>
            {showAllData.length > 0 &&
              showAllData.map((data, i) => (
                <div
                  className="selectedData"
                  style={{ borderTop: i === 0 ? "0px" : "" }}
                  key={i}
                >
                  <div className="stateName">{data.stateName}</div>
                  {data.districtName.map((item, i) => (
                    <div className="districtCount" key={i}>
                      <div className="districtName">{item}</div>
                      <img
                        className="cancelIcon"
                        onClick={() =>
                          HandleRemoveDistrictData(data.stateName, item, i)
                        }
                        src={cancelImg}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default BasicContainer;

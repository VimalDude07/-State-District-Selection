import arrowImg from "./ImgReact/CaretRight.png";
import cancelImg from "./ImgReact/XCircle.png";
import arrowIcon from "./ImgReact/CaretDown.png";
import BasicContainer from "./BasicContainer";  
import { useState, useRef, useEffect } from "react";
// import { modalContext } from "./App1";

function Modal1() {
  const location = JSON.parse(localStorage.getItem("location"));
  const selectAllRef = useRef("");


  const [index, setIndex] = useState(0);
  const [showAllData, setShowAllData] = useState([]);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [stateDistrictData, setStateDistrictData] = useState([]);
  
  const handleSelectData = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    setIndex(location.findIndex((item) => item.state === value));
    const stateData = location.find((el) => el.state === value);
    if (checked) {
      setStateDistrictData([
        ...stateDistrictData,
        { stateName: value, districtName: [...stateData.districts] },
      ]);
    } else {
      setStateDistrictData(
        stateDistrictData.filter((data) => data.stateName !== value)
      );
    }
  };

  const data = location[index]?.state;

  const handleAllSelectedData = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    const stateData = stateDistrictData.find((el) => el.stateName === data);
    let updatedStateData;

    if (stateData) {
      updatedStateData = stateDistrictData.map((el) =>
        el.stateName === data
          ? {
              ...el,
              districtName:
                checked === true
                  ? [...el.districtName, value]
                  : el.districtName.filter((district) => district !== value),
            }
          : el
      );
    } else {
      updatedStateData = [
        ...stateDistrictData,
        { stateName: data, districtName: [value] },
      ];
    }

    updatedStateData = updatedStateData.filter(
      (state) => state.districtName.length > 0
    );

    setStateDistrictData(updatedStateData);
  };

  // console.log(stateDistrictData);

  const allDistrictLength = stateDistrictData.map(
    (id) => id.districtName.length
  );
  let totalDistricts = 0;
  allDistrictLength.forEach((el) => {
    totalDistricts += el;
  });

  const removeDistrictData = (stateValue, districtValue) => {
    setIndex(location.findIndex((el) => el.state === stateValue));
    setStateDistrictData((prevData) => {
      const updatedData = prevData.map((state) =>
        state.stateName === stateValue
          ? {
              ...state,
              districtName: state.districtName.filter(
                (district) => district !== districtValue
              ),
            }
          : state
      );

      return updatedData.filter((state) => state.districtName.length > 0);
    });
  };

  const districtLength = location[index]?.districts.length;
  const statelength = stateDistrictData.map((state) => state.stateName);

  useEffect(() => {
    if (selectAllRef.current) {
      const selectedState = stateDistrictData.find(
        (state) => state.stateName === location[index]?.state
      );
      if (!selectedState) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = false;
      } else {
        const totalDistricts = location[index]?.districts.length || 0;
        const selectedDistricts = selectedState.districtName.length;
        if (selectedDistricts === 0) {
          selectAllRef.current.indeterminate = false;
          selectAllRef.current.checked = false;
        } else if (selectedDistricts === totalDistricts) {
          selectAllRef.current.indeterminate = false;
          selectAllRef.current.checked = true;
        } else {
          selectAllRef.current.indeterminate = true;
        }
      }
    }
    if (!stateDistrictData.length > 0) {
      setShow(false);
    }
  }, [stateDistrictData, index, location]);

  const handleIndeterminateState = (data) => {
    const selectedState = stateDistrictData.find(
      (state) => state.stateName === data.state
    );
    return (
      selectedState &&
      selectedState.districtName.length > 0 &&
      selectedState.districtName.length < data.districts.length
    );
  };

  const allSelectData = (event) => {
    const checked = event.target.checked;
    const stateName = location[index]?.state;
    const stateData = location.find((item) => item.state === stateName);

    setStateDistrictData((prevData) =>
      checked
        ? [
            ...prevData.filter((state) => state.stateName !== stateName),
            { stateName, districtName: [...stateData.districts] },
          ]
        : prevData.filter((state) => state.stateName !== stateName)
    );
  };

  const saveDetails = () => {
    if (stateDistrictData.length === 0) {
      alert("Please Fill The Field Below Given");
    } else {
      setModal(false);
      
      const newData = [...stateDistrictData];
      setShowAllData(newData);
      
      localStorage.setItem("stateDistrictData", JSON.stringify(newData));
      localStorage.setItem("showAllData", JSON.stringify(newData));
      localStorage.setItem("index", JSON.stringify(index));

      const getData=JSON.parse(localStorage.getItem("stateDistrictData"))
      setStateDistrictData(getData)
    }
  };
  const cancelDetails = () => {
    setModal(false);
  }
  
  return (
    <>
      <div className="modal" style={{ display: modal ? "block" : "none" }}>
        <div className="allinone">
          <div className="modalBox">
            <div className="modelTitle">Select State and District</div>
            <div className="modelDetails">
              <div className="stateData">
                <div className="selectDetails">
                  <p className="stateCount">
                    {statelength.length} States / {totalDistricts} District
                  </p>

                  <div
                    className="showDetails"
                    onClick={() =>
                      setShow(
                        show === false && stateDistrictData.length > 0
                          ? true
                          : false
                      )
                    }
                    id="increase"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="arrowtext" htmlFor="increase">
                      {show === false ? "Show" : "Hide"}
                    </div>
                    <img
                      className="arrowicon"
                      htmlFor="increase"
                      style={{ rotate: show ? "180deg" : "0deg" }}
                      src={arrowIcon}
                      alt=""
                    />
                  </div>
                </div>
                <div className="showData" style={{ maxHeight: "120px" }}>
                  {stateDistrictData.map((data, i) => (
                    <div
                      className="selectedData"
                      style={{
                        display: !show ? "none" : "flex",
                        borderTop: i === 0 ? "0px" : "",
                      }}
                      key={i}
                    >
                      <div className="stateName">{data.stateName}</div>
                      {data.districtName.map((item, i) => (
                        <div className="districtCount" key={i}>
                          <div className="districtName">{item}</div>
                          <img
                            className="cancelIcon"
                            onClick={() =>
                              removeDistrictData(data.stateName, item, i)
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

              <div className="selectCheckBox">
                <div className="selectState">
                  <div className="titleName">STATES:({statelength.length})</div>
                  {location.map((data, i) => (
                    <div
                      key={i}
                      className="stateCheckBox"
                      onClick={() => setIndex(i)}
                      style={{
                        background: index === i ? "#F6F7F8" : "",
                        borderBottomLeftRadius:
                          data.state.length === i + 1 ? "8px" : "",
                        borderBottomRightRadius:
                          data.state.length === i + 1 ? "8px" : "",
                      }}
                    >
                      <div className="stateCheckBox1">
                        <div className="stateInput">
                          <input
                            className="headingInput"
                            type="checkbox"
                            onChange={(event) => handleSelectData(event)}
                            value={data.state}
                            checked={stateDistrictData
                              .map((state) => state.stateName)
                              .includes(data.state)}
                            ref={(el) => {
                              if (el) {
                                el.indeterminate =
                                  handleIndeterminateState(data);
                              }
                            }}
                          />
                          <label>{data.state}</label>

                          <div className="count">
                            {stateDistrictData.find(
                              (state) => state.stateName === data.state
                            )?.districtName.length || 0}
                            /{data.districts.length}
                          </div>
                        </div>
                        <img className="arrowIcon1" src={arrowImg} alt="" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="selectDistrict">
                  <div className="titleName1">Districts({districtLength}):</div>

                  <div className="districtCheckbox">
                    <input
                      type="checkbox"
                      className="headingInput"
                      onChange={(event) => allSelectData(event)}
                      id="all"
                      ref={selectAllRef}
                    />
                    <label htmlFor="all" className="selectAllDistrict">
                      Select All
                    </label>
                  </div>
                  <div className="allDistrict">
                    <div
                      className="districtCheckbox1"
                      style={{ maxHeight: "185px" }}
                    >
                      {location[index]?.districts.map((district, i) => (
                        <div className="districtName1" key={i}>
                          <input
                            type="checkbox"
                            onChange={(event) => handleAllSelectedData(event)}
                            value={district}
                            id={district}
                            checked={
                              stateDistrictData
                                .find(
                                  (state) =>
                                    state.stateName === location[index]?.state
                                )
                                ?.districtName.includes(district) || false
                            }
                          />
                          <label
                            htmlFor={district}
                            className="selectAllDistrict"
                          >
                            {district}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="hrline2" />
              <div className="btnTag">
                <button className="sumbitBtn" onClick={saveDetails}>
                  Apply
                </button>
                <button onClick={cancelDetails} className="cancelBtn">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasicContainer
        setStateDistrictData={setStateDistrictData}
        setModal={setModal}
        setIndex={setIndex}
        setShowAllData={setShowAllData}
      />
    </>
  );
}

export default Modal1;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../styles/Main.css";

export default function Main() {
  // const [data1, setData1] = useState("");
  // const [data2, setData2] = useState("");

  // const solve1 = (event) => {
  //   setData1(event.target.value);
  // };
  // const solve2 = (event) => {
  //   setData2(event.target.value);
  // };

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  // function checkdata() {
  //   if (data1.length === 0 || data2.length === 0) {
     
  //     return false;
  //   }

  //   return true;
  // }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function startQuiz() {
    // checkdata()
    if (inputRef.current?.value) {
      if (validateEmail(inputRef.current?.value)) {
        dispatch(setUserId(inputRef.current?.value));
      } else {
        alert("Please fill valid mail id ");
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Skill Tracker</h1>
      <ol>
        <li>You will be asked some questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>
          Each question has three options. You can choose only one options.
        </li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>
      <form id="form">
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="inputField">NAME:</label>
          <input
            // ref={inputRef}
            className="userid"
            type="text"
            placeholder="NAME"
            // onChange={solve1}
            // value={data1}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="inputField">EMAIL:</label>
          <input
            ref={inputRef}
            className="userid"
            type="email"
            placeholder="ENTER VALID MAIL ID"
            // onChange={solve2}
            // value={data2}
            style={{ marginRight: "10px" }}
          />
        </div>
        ``
      </form>

      <div className="start">
        {
          <Link
            className="btn"
            to={"quiz"}
            onClick={startQuiz}
          >
            Start Quiz
          </Link>
        }
      </div>
    </div>
  );
}

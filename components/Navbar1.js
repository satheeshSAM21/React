import React, { Component } from "react";
import { FaUserAlt } from "react-icons/fa";
import "./dashboard.css";
import axios from "axios";

import { MdDashboard } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

import { BiSearchAlt2 } from "react-icons/bi";

export default class Navbar1 extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <>
        <div>
          <div className="navs">
            <div>
              <p style={{ fontSize: "15px" }}>Dashboard </p>
            </div>
            <div className="navs2">
              <input type="text" placeholder="Search...." />
              <div className="navsic">
                <p className="search">
                  <BiSearchAlt2 />
                </p>
                <p>
                  <MdDashboard />
                </p>
                <p>
                  <IoIosNotifications /> <span className="noti">5</span>
                </p>
                <p>
                  <FaUserAlt />
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

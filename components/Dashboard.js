import React, { Component } from "react";
import "./dashboard.css";
import Sidebar from "../pages/sidebar";
import Posts from "../component/Posts";
import Navbar1 from "./Navbar1";
import Footer from "../pages/footer";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdOutlineError, MdOutlineUpdate } from "react-icons/md";
import Pagination from "react-responsive-pagination";
import "bootstrap/dist/css/bootstrap.css";
import { VscNotebookTemplate } from "react-icons/vsc";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import cookie from "react-cookies";
import {
  SiHomeassistantcommunitystore,
  SiPivotaltracker,
} from "react-icons/si";
import { MdOutlineDateRange } from "react-icons/md";
import axios from "axios";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      currentPage: 1,
      postsPerPage: 10,
      activePage: 1,
      total: 0,
    };
  }

  ApiCall = () => {
    let token = cookie.load("token");
    console.log(token);
    axios
      .get(
        `http://3.16.194.5:8000/api/v1/admin/amenity?page=${this.state.currentPage}&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
        }

        this.setState({
          posts: res.data.data.amenities,
          total: res.data.data.total,
          loading: false,
        });
      });
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.ApiCall();
  }

  paginate = (pageNumber) => {
    console.log(pageNumber);

    this.setState({ currentPage: pageNumber }, () => {
      this.ApiCall();
    });
  };

  onClick = (e) => {
    e.preventDefault();
  };
  render() {
    const { users, currentPage, postsPerPage, loading, total } = this.state;
    return (
      <>
        <div>
          <div className="dash">
            <div>
              <Sidebar />
            </div>
            <div className="Main">
              <div>
                {/* nav bar  */}
                <div>
                  <Navbar1 />
                </div>

                {/* dasboard */}
                <div className="dash1">
                  <div className="d1">
                    <div className="d2">
                      <p>
                        <VscNotebookTemplate className="icondas1" />
                      </p>
                      <div className="fix">
                        <p>Used Space</p>
                        <h3>49/50 GB</h3>
                      </div>
                    </div>

                    <p className="dicon" style={{ color: "orange" }}>
                      <BsFillExclamationTriangleFill
                        style={{ marginRight: "5px", color: "orange" }}
                      />
                      Get More Space
                    </p>
                  </div>

                  <div className="d1">
                    <div className="d2">
                      <p>
                        <SiHomeassistantcommunitystore className="icondas2" />
                      </p>
                      <div className="fix">
                        <p>Revenue</p>
                        <h3>$34,245</h3>
                      </div>
                    </div>

                    <p className="dicon">
                      <MdOutlineDateRange style={{ marginRight: "5px" }} />
                      Last 24 Hours
                    </p>
                  </div>

                  <div className="d1">
                    <div className="d2">
                      <p>
                        <MdOutlineError className="icondas3" />
                      </p>
                      <div className="fix">
                        <p>Fixed Issues</p>
                        <h3>75</h3>
                      </div>
                    </div>

                    <p className="dicon">
                      <SiPivotaltracker style={{ marginRight: "5px" }} />
                      Tracked from Github
                    </p>
                  </div>

                  <div className="d1">
                    <div className="d2">
                      <p>
                        <AiOutlineTwitter className="icondas4" />
                      </p>
                      <div className="fix">
                        <p>Followers </p>
                        <h3>+245</h3>
                      </div>
                    </div>

                    <p className="dicon">
                      <MdOutlineUpdate style={{ marginRight: "5px" }} />
                      Just Updated
                    </p>
                  </div>
                </div>

                {/* Table */}

                <div>
                  <Posts
                    posts={this.state.posts}
                    loading={loading}
                    apiCall={this.ApiCall}
                  />
                  <Pagination
                    total={Math.ceil(total / 5)}
                    current={currentPage}
                    onPageChange={this.paginate}
                  />
                </div>
                {/* Footer */}
                <div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

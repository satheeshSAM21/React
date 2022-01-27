import React, { Component } from "react";
import "./App.css";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import axios from "axios";
import cookie from "react-cookies";
import Dashboard from "./Dashboard";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      history: "",
      isLoggedIn: "true",
      errors: {
        name: false,
        email: false,
        password: false,
        cpassword: false,
        postId: null,
      },
      err_msg: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit() {
    console.log(this.state.name);
    console.log(this.props);

    const re = new RegExp(
      "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])(?=.*[0-9]).{8,32}$"
    );
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    let { name, email, password, cpassword, isLoggedIn } = this.state;

    if (name === "") {
      this.setState({
        err_msg: "*Please enter name",
        errors: {
          name: true,
        },
      });
    } else if (name.length < 3) {
      this.setState({
        err_msg: "*Name character should be above three",
        errors: {
          name: true,
        },
      });
    } else if (!name.match(/^[a-zA-Z ]*$/)) {
      this.setState({
        err_msg: "*Enter alphabets only",
        errors: {
          name: true,
        },
      });
    } else if (email === "") {
      this.setState({
        err_msg: "*Please enter email-id",
        errors: {
          email: true,
        },
      });
    } else if (!pattern.test(email)) {
      this.setState({
        err_msg: "*Please enter valid email-id",
        errors: {
          email: true,
        },
      });
    } else if (password === "") {
      this.setState({
        err_msg: "*Please enter password",
        errors: {
          password: true,
        },
      });
    }
    //  else if (!re.test(password)) {
    //   this.setState({
    //     err_msg:
    //       "Password should contain atleast one Upper case,one lower case,one special character and number",
    //     errors: {
    //       password: true,
    //     },
    //   });
    // }
    else if (cpassword === "") {
      this.setState({
        err_msg: "*Please enter confirm password",
        errors: {
          cpassword: true,
        },
      });
    } else if (password !== cpassword) {
      this.setState({
        err_msg: "*Please enter same password",
        errors: {
          cpassword: true,
        },
      });
    } else {
      this.setState({
        // name: "",
        // email: "",
        // password: "",
        // cpassword: "",
        // errors: {
        //   name: false,
        //   email: false,
        //   password: false,
        //   cpassword: false,
        // },
        err_msg: "",
      });

      let dataToSend = {
        // email: "eve.holt@reqres.in",
        // password: "cityslicka",
        username: this.state.name,
        password: this.state.password,
        // https://reqres.in/api/login
      };
      console.log(dataToSend);

      axios
        .post("http://3.16.194.5:8000/api/v1/auth/admin/signin", dataToSend)
        .then(function (response) {
          console.log(response);

          let token = response.data.data.token;
          console.log(token);
          cookie.save("token", token);
          window.location.reload();
        });

      // .catch(function (error) {
      //   console.log(error);
      // });
      console.log("success");
    }
  }

  render() {
    // const { err_msg, errors,name,password,cpassword,email } = this.state;
    const { err_msg, errors, postId } = this.state;

    return (
      <div>
        <div className="container1">
          <div className="row1">
            <div className="r1">
              <div className="sign">
                <p style={{ fontSize: "18px" }}>Sign In</p>
                <div className="icons">
                  <p style={{ marginRight: "15px" }}>
                    <FaFacebookF />
                  </p>
                  <p>
                    <AiOutlineTwitter />
                  </p>
                </div>
              </div>

              <div>
                <p>
                  <strong>USERNAME</strong>
                </p>
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />

                <span className={errors.name ? "errorMsg " : "hide_err"}>
                  {err_msg}
                </span>
              </div>

              <div>
                <p>
                  <strong>EMAIL</strong>
                </p>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span className={errors.email ? "errorMsg" : "hide_err"}>
                  {err_msg}
                </span>
              </div>

              <div>
                <p>
                  <strong>PASSWORD</strong>
                </p>
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span className={errors.password ? "errorMsg" : "hide_err"}>
                  {err_msg}
                </span>
              </div>

              <div>
                <p>
                  <strong>CONFIRM PASSWORD</strong>
                </p>
                <input
                  type="text"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={this.state.cpassword}
                  onChange={this.handleChange}
                />
                <span className={errors.cpassword ? "errorMsg" : "hide_err"}>
                  {err_msg}
                </span>
              </div>

              <div>
                <button type="submit" onClick={this.handleSubmit}>
                  Sign In
                </button>
              </div>

              <div className="check">
                <div style={{ fontSize: "14px", color: "rgb(243, 26, 73)" }}>
                  <input
                    type="checkbox"
                    checked="checked"
                    style={{ backgroundColor: "red" }}
                  />
                  Remember me
                </div>

                <div style={{ fontSize: "14px" }}>Forgot Password</div>
              </div>
            </div>
            <div className="r2">
              <div className="signup">
                <div>
                  <h2>Welcome to login</h2>
                  <p>Don't have an account?</p>
                  <button>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

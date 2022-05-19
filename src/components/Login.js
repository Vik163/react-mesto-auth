import React from "react";
import { withRouter } from "react-router-dom";
import { auth } from "./../auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }

    auth
      .authorization(this.state.password, this.state.email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);

          this.setState({ email: "", password: "" }, () => {
            this.props.handleLogin();
            this.props.history.push("/");
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="register">
        <h2 className="register__title">Вход</h2>

        <form
          onSubmit={this.handleSubmit}
          // action="#"
          // name={name}
          // className={`register__form register__form_type_${name}`}
          noValidate
        >
          <input
            className="register__input register__input_type_email"
            id="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.email ?? ""}
            placeholder="Email"
            name="email"
            required
          />
          <input
            className="register__input register__input_type_password"
            id="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password ?? ""}
            placeholder="Пароль"
            name="password"
            required
          />
          <button className="register__submit button-hover" type="submit">
            Войти
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

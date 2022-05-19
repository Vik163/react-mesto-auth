import React from "react";
import { Link, withRouter } from "react-router-dom";

import { auth } from "./../auth";

// function Register(props) {
//   const { email, password, confirmPassword } = props;
//   const [infoAuth, setInfoAuth] = React.useState({
//     email: "",
//     password: "",
//   });
//   // const [infoPassword, setInfoPassword] = React.useState("");
//   const textInput = React.useRef({});

//   function handleChange(e) {
//     const { name, value } = e.target;
//     console.log(infoAuth);

//     setInfoAuth({
//       [name]: value,
//     });
//   }
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       // сюда добавим логику обработки формы регистрации
//     }
//   }
class Register extends React.Component {
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
    const { password, email } = this.state;

    auth
      .registration(password, email)
      .then((res) => {
        if (res) {
          this.setState(
            {
              message: "",
            },
            () => {
              this.props.history.push("/login");
            }
          );
        } else {
          this.setState({
            message: "Что-то пошло не так!",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="register">
        <h2 className="register__title">Регистрация</h2>

        <form
          onSubmit={this.handleSubmit}
          // action="#"
          // name={name}
          // className={`register__form register__form_type_${name}`}
          // noValidate
        >
          {/* {children} */}

          <input
            className="register__input register__input_type_email"
            id="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.email ?? ""}
            // ref={textInput}
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
            // ref={textInput}
            placeholder="Пароль"
            name="password"
            required
          />
          <button className="register__submit button-hover" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link className="register__caption button-hover" to="/sign-in">
          <span>Уже зарегистрированы? Войти</span>
        </Link>
      </div>
    );
  }
}

export default withRouter(Register);

import React from "react";
import "./Nav2.css";
import Burger from "./burger-menu.png";
class Nav2 extends React.Component {
  render() {
    return (
      <div>
        <header className="header2">
          <a className="logo" href="/">
            {" "}
            Uniquiz
          </a>
          <nav>
            <ul className="nav__links">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Nosotros</a>
              </li>
              <li>
                <a href="#">Testimonios</a>
              </li>
              <li>
                <a href="#">Quizes</a>
              </li>
              <li>
                <a href="#">Contacto</a>
              </li>
            </ul>
          </nav>
          <a className="cta" href="#">
            Quizate!
          </a>
          <p className="menu cta">Quizate!</p>
          <img src={Burger} className="burger" alt="menu" />
        </header>

        <div id="mobile__menu" class="overlay">
          <a class="close">&times;</a>
          <div class="overlay__content">
            <a href="#">Services</a>
            <a href="#">Projects</a>
            <a href="#">About</a>
          </div>
        </div>
      </div>
    );
  }
}
export default Nav2;

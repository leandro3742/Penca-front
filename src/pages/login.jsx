import React from "react";
import LoginGithub from 'react-login-github';

const Login = () => {
  const getA = async () => {
    await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json",
        "Authorization": 'Bearer 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'
      }
    })
  }

  const onSuccess = async response => {
    let resp = response.code
    console.log(response)
    console.log(resp)
    await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body: {
        "client_id": '436f3043b58384f9aacc',
        "client_secret": '1245cfc8da6f1d37d199a7e32a94e361d77183bc',
        "code": 'resp',
        'redirect_uri': 'http://localhost:5173/login'
      }
    }).then(res => console.log(res)).catch(err => console.error(err))
  };
const onFailure = response => console.error(response);
  return (
    <div className="portadaRegistro" style={{ width: "100%" }}>
      <button onClick={getA}>Get</button>
      <div className="center login1" style={{ paddingBottom: "20px" }}>
        <h1 style={{ color: "white" }}>Iniciar Sesión</h1>
        <br />
        <br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Ingrese su correo"
          className="form-control"
          style={{}}
        />
        <br />
        <br />
        <input
          type="text"
          name="pass"
          id="pass"
          placeholder="Ingrese su contraseña"
          className="form-control"
        />
        <LoginGithub
          clientId="436f3043b58384f9aacc"
          scope={'user'}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />,
        <input
          type="submit"
          className="btn-verde"
          style={{ marginTop: "60px" }}
          value="Login"
        />{" "}
        <br /> <br /> <br />
        <a href="/registro" className="labelregistro">
          Todavía no tienes una cuenta? Click aquí para registrarte!
        </a>
      </div>
    </div>
  );
};

export default Login;

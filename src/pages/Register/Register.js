import styles from "./Register.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    await createUser(user);

    //const res = await createUser(user)
    /*console.log(res)*/
  };

  useEffect(() => {
    document.title = "My BLOCKLY Maze | Cadastro";
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h2>Cadastrar</h2>
        <p>Insira seus dados</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoFocus
          />

          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {!loading && <button className="btn">Cadastrar</button>}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;

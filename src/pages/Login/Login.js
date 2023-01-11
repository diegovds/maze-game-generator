import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks/useAuthentication";

import { isEmail } from "validator";

const Login = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, error: authError, loading } = useAuthentication();

  const submit = async (data) => {
    const { email, password } = data;

    setError("");

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    document.title = "My BLOCKLY Maze | Login";
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>Entrar</h2>
        <p>Insira suas credenciais</p>
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <input
            type="text"
            placeholder="E-mail"
            autoFocus
            {...register("email", {
              required: true,
              validate: (value) => isEmail(value),
            })}
          />
          {errors?.email?.type === "required" && (
            <p className={styles.inputError}>O e-mail precisa ser informado.</p>
          )}
          {errors?.email?.type === "validate" && (
            <p className={styles.inputError}>
              O e-mail informado não é válido.
            </p>
          )}
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password?.type === "minLength" && (
            <p className={styles.inputError}>
              A senha precisa conter pelo menos 6 caracteres.
            </p>
          )}
          {errors?.password?.type === "required" && (
            <p className={styles.inputError}>A senha precisa ser informada.</p>
          )}
          {!loading && <button className="btn">Entrar</button>}
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

export default Login;

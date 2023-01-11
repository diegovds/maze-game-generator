import styles from "./Register.module.css";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import { useForm } from "react-hook-form";
import { isEmail } from "validator";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const watchPassword = watch("password");

  const submit = async (data) => {
    const { name: displayName, email, password } = data;

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    await createUser(user);
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
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <input
            type="text"
            placeholder="Nome"
            autoFocus
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <p className={styles.inputError}>O nome precisa ser informado.</p>
          )}
          <input
            type="text"
            placeholder="E-mail"
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
          <input
            type="password"
            placeholder="Confirme a senha"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.passwordConfirmation?.type === "validate" && (
            <p className={styles.inputError}>As senhas precisam ser iguais!</p>
          )}
          {errors?.passwordConfirmation?.type === "required" && (
            <p className={styles.inputError}>
              A confirmação da senha precisa ser informada.
            </p>
          )}
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

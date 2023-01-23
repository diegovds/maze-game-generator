import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks/useAuthentication";

import { isEmail } from "validator";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recoverPassword, setRecoverPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    login,
    forgotPassword,
    error: authError,
    success: emailSent,
    loading,
  } = useAuthentication();

  const submit = async (data) => {
    const { email, password } = data;

    setError("");
    setSuccess("");

    const user = {
      email,
      password,
    };

    !recoverPassword ? await login(user) : await forgotPassword(user.email);
  };

  useEffect(() => {
    document.title = "My BLOCKLY Maze | Login";
    if (authError) {
      setError(authError);
    }

    if (emailSent) {
      setSuccess(emailSent);
    }
  }, [authError, emailSent]);

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        {!recoverPassword ? (
          <>
            <h2>Entrar</h2>
            <p>Insira suas credenciais</p>
          </>
        ) : (
          <>
            <h2>Redefinição de senha</h2>
            <p>Insira o e-mail cadastrado</p>
          </>
        )}
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
          {!recoverPassword && (
            <input
              type="password"
              placeholder="Senha"
              {...register("password", { required: true, minLength: 6 })}
            />
          )}
          {errors?.password?.type === "minLength" && (
            <p className={styles.inputError}>
              A senha precisa conter pelo menos 6 caracteres.
            </p>
          )}
          {errors?.password?.type === "required" && (
            <p className={styles.inputError}>A senha precisa ser informada.</p>
          )}
          {!loading && !recoverPassword && (
            <button className="btn">Entrar</button>
          )}
          {!loading && recoverPassword && (
            <button className="btn">Redefinir senha</button>
          )}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {!recoverPassword ? (
            <button className={styles.recoverButton} onClick={() => setRecoverPassword(true)}>
              Esqueci minha senha
            </button>
          ) : (
            <button className={styles.recoverButton} onClick={() => setRecoverPassword(false)}>
              Voltar
            </button>
          )}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

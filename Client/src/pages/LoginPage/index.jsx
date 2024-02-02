import { Stack, Typography } from "@mui/material";

import { Form } from "components";

import { fields, schema } from "./form-data";

import { useState } from "react";

import { login } from "services/auth-service";

import { toast } from "react-toastify";

import { useAuth } from "hooks";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [, dispatch] = useAuth();
  const [errorsFromResponse, setErrorsFromResponse] = useState([]);

  const onSubmit = (user) => {
    login(user)
      .then((decodedJWT) => {
        const { username, isAdmin } = decodedJWT;

        const type = isAdmin ? "admin" : "login";

        const to = isAdmin ? "/dashboard" : "/profile";

        dispatch({ type, username });
        navigate(to, { replace: true });
      })
      .catch((err) => {
        const { data, status } = err.response;

        if (Array.isArray(data) && status === 400) {
          setErrorsFromResponse(err.response.data);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h2" component="h2">
        Acceso Usuario{" "}
      </Typography>

      <Form
        inputs={fields}
        onSubmit={onSubmit}
        validationSchema={schema}
        errorsFromResponse={errorsFromResponse}
        submitLabel="Entrar"
      />
    </Stack>
  );
}

export default LoginPage;

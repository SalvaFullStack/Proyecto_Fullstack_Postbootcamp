import * as yup from "yup";

const fields = [
  {
    name: "username",
    label: "Username",
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
  },
  {
    name: "position",
    label: "Posicion",
    type: "select",
    options: ["Delantero", "Centrocampista", "Defensa", "Portero"].map(
      (item) => ({ label: item, value: item })
    ),
    placeholder: "Elige tu posición",
  },
];

const schema = yup
  .object({
    username: yup.string().required("Nombre de usuario obligatorio"),
    password: yup.string().required("Contraseña obligatoria"),
  })
  .required();

export { fields, schema };

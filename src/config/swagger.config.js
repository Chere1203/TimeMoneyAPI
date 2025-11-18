import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Time is Money API",
      version: "1.0.0",
      description: "API HTTP para el proyecto Time is Money: gestión de usuario, preferencias, gastos, metas y cartera."
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/controllers/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);

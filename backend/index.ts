import express, { Request, response, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./src/database/config";
import cors from "cors";
import taskRoute from "./src/routes/taks";
import morgan from "morgan"

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  };

//Config Server
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("tiny"))

//Routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World");
  });
app.use("/api", taskRoute)


//Start Server
async function start() {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Coneccion Establecida");
   
      app
        .listen(PORT, () => {
          console.log("Servidor Corriendo en Puerto: http://localhost:" + PORT);
        })
        .on("error", (error) => {
          throw new Error(error.message);
        });
    });
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Error conectandose a la base de datos", error);
  } 
}
start();

import "./styles.css";
import knightMoves from "./models/knight";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

console.log(knightMoves([0, 0], [7, 7]));

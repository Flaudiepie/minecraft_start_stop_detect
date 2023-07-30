import { MinecraftServerInstance } from "./src/serverInstance";
import checkForJson from "./src/util/checkForJson";

const main = async () => {
  console.log(MinecraftServerInstance.getAllServers());
  new MinecraftServerInstance("", 432, "");
};

main();

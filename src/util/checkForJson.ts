import fs from "fs";

export const checkForJson = () => {
  if (!fs.existsSync("servers.json")) {
    fs.writeFileSync("servers.json", "[]");
  }
};

export const getServerJson = (): string => {
  checkForJson();
  return fs.readFileSync("servers.json").toString();
};

export default checkForJson;

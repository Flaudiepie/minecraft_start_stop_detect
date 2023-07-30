import { randomUUID } from "crypto";
import Server from "./interfaces/server";
import checkMcPort from "./portChecker";
import serversJson from "../servers.json";
import fs from "fs";

export class MinecraftServerInstance {
  name: string;
  id: string;
  startScriptPath: string;
  port: number;
  isActive: boolean = false;

  constructor(
    startScriptPath: string,
    port: number,
    name: string,
    id?: string
  ) {
    this.startScriptPath = startScriptPath;
    this.port = port;
    this.name = name;
    this.id = id || randomUUID();
    if (!id) {
      this.add();
    }
  }

  public start() {}

  public add() {
    const servers: Server[] = serversJson;
    servers.push({
      startScriptPath: this.startScriptPath,
      port: this.port,
      name: this.name,
      id: this.id,
    });
    fs.writeFileSync("servers.json", JSON.stringify(servers));
  }

  public remove() {
    const servers: Server[] = serversJson;
    const newServerJson = servers.filter((value) => value.id !== this.id);
    fs.writeFileSync("servers.json", JSON.stringify(newServerJson));
  }

  public static getAllServers(): MinecraftServerInstance[] {
    return serversJson.map((server: Server) => {
      return new MinecraftServerInstance(
        server.startScriptPath,
        server.port,
        server.name,
        server.id
      );
    });
  }
}

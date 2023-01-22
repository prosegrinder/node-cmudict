import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

interface CMUDictPhone {
  symbol: string;
  sound: string;
}

export class CMUDict {
  phones: Array<CMUDictPhone>;
  symbols: Array<string>;

  constructor() {
    const phoneData = this.readPhonesSync();
    const phoneLines = phoneData.split(/\r?\n/);
    const phones = phoneLines.map((line) => {
      const parts = line.split(" ");
      const symbol = parts[0];
      const sound = parts[1];
      return { symbol: symbol, sound: sound };
    });
    this.phones = phones;

    this.symbols = this.readSymbolsSync().split(/\r?\n/);
  }

  public readPhonesSync(): string {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const filename = path.join(dirname, "data", "cmudict.phones");
    return fs.readFileSync(filename, "utf8").trim();
  }

  public readSymbolsSync(): string {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const filename = path.join(dirname, "data", "cmudict.symbols");
    return fs.readFileSync(filename, "utf8").trim();
  }
}

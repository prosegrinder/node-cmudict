import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

export class CMUDict {
  private CMUDICT_DICT = "cmudict.dict";
  private CMUDICT_PHONES = "cmudict.phones";
  private CMUDICT_SYMBOLS = "cmudict.symbols";
  private CMUDICT_VP = "cmudict.vp";
  private CMUDICT_LICENSE = "LICENSE";

  readonly dict_string: string;
  readonly dict: Map<string, Array<Array<string>>>;
  readonly phones_string: string;
  readonly phones: Map<string, Array<string>>;
  readonly symbols_string: string;
  readonly symbols: Array<string>;
  readonly vp_string: string;
  readonly vp: Map<string, Array<string>>;
  readonly license_string: string;

  constructor() {
    this.dict_string = this.stringsSync(this.CMUDICT_DICT);
    this.phones_string = this.stringsSync(this.CMUDICT_PHONES);
    this.symbols_string = this.stringsSync(this.CMUDICT_SYMBOLS);
    this.vp_string = this.stringsSync(this.CMUDICT_VP);
    this.license_string = this.stringsSync(this.CMUDICT_LICENSE);

    this.dict = this.dictEntries(this.dict_string);
    this.phones = this.phonesEntries(this.phones_string);
    this.symbols = this.symbolsSync();
    this.vp = this.vpSync();
  }

  private stringsSync(resource_name: string): string {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const filename = path.join(dirname, "data", resource_name);
    const data = fs.readFileSync(filename, "utf8");
    return data;
  }

  private entries(
    data_string: string,
    comment_string: string | null,
  ): Array<[string, Array<string>]> {
    const lines = data_string.trim().split(/\r?\n/);
    const data_entries: Array<[string, Array<string>]> = lines.map((line) => {
      let parts: Array<string> = [];
      if (comment_string !== null) {
        parts = line.trim().split(comment_string)[0].split(" ");
      } else {
        parts = line.trim().split(" ");
      }
      const thing = parts[0].replace(/\(\d\)$/, "");
      return [thing, parts.slice(1).filter((x) => x !== "")];
    });
    return data_entries;
  }

  private dictEntries(data_string: string): Map<string, Array<Array<string>>> {
    const cmudict_entries = this.entries(data_string, "#");
    const dict: Map<string, Array<Array<string>>> = new Map();
    cmudict_entries.forEach((entry) => {
      const word = entry[0];
      const pronunciations = entry[1];
      dict.get(word)
        ? dict.get(word)?.push(pronunciations)
        : dict.set(word, [pronunciations]);
    });
    return dict;
  }

  private phonesEntries(data_string: string): Map<string, Array<string>> {
    const phones_entries = this.entries(data_string, "#");
    const phones = new Map();
    phones_entries.forEach((entry) => {
      const phone = entry[0];
      const symbols = entry[1];
      phones.get(phone)
        ? phones.get(phone)?.push(symbols)
        : phones.set(phone, [symbols]);
    });
    return phones;
  }

  private entriesSync(
    resource_name: string,
    comment_string: string | null,
  ): Array<[string, Array<string>]> {
    const data = this.stringsSync(resource_name).trim();
    const lines = data.split(/\r?\n/);
    const file_entries: Array<[string, Array<string>]> = lines.map((line) => {
      let parts: Array<string> = [];
      if (comment_string !== null) {
        parts = line.trim().split(comment_string)[0].split(" ");
      } else {
        parts = line.trim().split(" ");
      }
      const thing = parts[0].replace(/\(\d\)$/, "");
      return [thing, parts.slice(1).filter((x) => x !== "")];
    });
    return file_entries;
  }

  private phonesSync(): Map<string, Array<string>> {
    const phone_strings = this.stringsSync(this.CMUDICT_PHONES).trim();
    const lines = phone_strings.split(/\r?\n/);
    const phones = new Map();
    lines.forEach((line) => {
      const parts = line.trim().split(" ");
      phones.get(parts[0])
        ? phones.get(parts[0])?.push(parts[1])
        : phones.set(parts[0], [parts[1]]);
    });
    return phones;
  }

  private symbolsSync(): Array<string> {
    return this.stringsSync(this.CMUDICT_SYMBOLS).trim().split(/\r?\n/);
  }

  private dictSync(): Map<string, Array<Array<string>>> {
    const cmudict_entries = this.entriesSync(this.CMUDICT_DICT, "#");
    const dict: Map<string, Array<Array<string>>> = new Map();
    cmudict_entries.forEach((entry) => {
      const word = entry[0];
      const pronunciations = entry[1];
      dict.get(word)
        ? dict.get(word)?.push(pronunciations)
        : dict.set(word, [pronunciations]);
    });
    return dict;
  }

  private vpSync(): Map<string, Array<string>> {
    const vp_strings = this.stringsSync(this.CMUDICT_VP).trim();
    const lines = vp_strings.split(/\r?\n/);
    const vps = new Map();
    lines.forEach((line) => {
      const parts = line.trim().split(" ");
      vps.get(parts[0])
        ? vps.get(parts[0])?.push(parts[1])
        : vps.set(parts[0], [parts[1]]);
    });
    return vps;
  }
}

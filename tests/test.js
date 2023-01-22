import chai from "chai";
import { CMUDict } from "../dist/index.js";

const cmudict = new CMUDict();

describe("#phones", () => {
  const expected_entries = 39;
  it(`phones should contain ${expected_entries} entries`, () => {
    chai.expect(cmudict.phones).to.be.an("Map");
    chai.expect(cmudict.phones).to.have.length(expected_entries);
  });
  const expected_length = 382;
  it(`phones_string should be ${expected_length} characters long`, () => {
    chai.expect(cmudict.phones_string).to.be.an("string");
    chai.expect(cmudict.phones_string).to.have.length(expected_length);
  });
});

describe("#dict", () => {
  const expected_entries = 126046;
  it(`dict should contain ${expected_entries} entries`, () => {
    chai.expect(cmudict.dict).to.be.an("Map");
    chai.expect(cmudict.dict).to.have.length(expected_entries);
  });
  const expected_length = 3618096;
  it(`dict_string should be ${expected_length} characters long`, () => {
    chai.expect(cmudict.dict_string).to.be.an("string");
    chai.expect(cmudict.dict_string).to.have.length(expected_length);
  });
  const expected_map = new Map(
    Object.entries({
      "d'artagnan": [["D", "AH0", "R", "T", "AE1", "NG", "Y", "AH0", "N"]],
      danglar: [["D", "AH0", "NG", "L", "AA1", "R"]],
      danglars: [["D", "AH0", "NG", "L", "AA1", "R", "Z"]],
      gdp: [["G", "IY1", "D", "IY1", "P", "IY1"]],
      hiv: [["EY1", "CH", "AY1", "V", "IY1"]],
      porthos: [["P", "AO0", "R", "T", "AO1", "S"]],
      spieth: [
        ["S", "P", "IY1", "TH"],
        ["S", "P", "AY1", "AH0", "TH"],
      ],
    }),
  );
  it("dict values should not contain comments", () => {
    expected_map.forEach((value, key, map) => {
      chai.expect(map).to.not.have.key(`;;; ${key}`);
      chai.expect(cmudict.dict.get(key)).to.deep.equal(value);
    });
  });
});

describe("#vp", () => {
  const expected_entries = 54;
  it(`vp should contain ${expected_entries} entries`, () => {
    chai.expect(cmudict.vp).to.be.an("Map");
    chai.expect(cmudict.vp).to.have.length(expected_entries);
  });
  const expected_length = 1747;
  it(`vp_string should be ${expected_length} characters long`, () => {
    chai.expect(cmudict.vp_string).to.be.an("string");
    chai.expect(cmudict.vp_string).to.have.length(expected_length);
  });
});

describe("#symbols", () => {
  const expected_entries = 84;
  it(`symbols should contain ${expected_entries} entries`, () => {
    chai.expect(cmudict.symbols).to.be.an("array");
    chai.expect(cmudict.symbols).to.have.length(expected_entries);
  });
  const expected_length = 281;
  it(`symbols_string should be ${expected_length} characters long`, () => {
    chai.expect(cmudict.symbols_string).to.be.an("string");
    chai.expect(cmudict.symbols_string).to.have.length(expected_length);
  });
});

describe("#license", () => {
  const expected_length = 1754;
  it(`license_string should be ${expected_length} characters long`, () => {
    chai.expect(cmudict.license_string).to.be.an("string");
    chai.expect(cmudict.license_string).to.have.length(expected_length);
  });
});

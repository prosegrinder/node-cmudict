import chai from "chai";
import { CMUDict } from "../dist/index.js";

const cmudict = new CMUDict();

describe("#phones()", () => {
  it("should return a list of phones", () => {
    const expected_length = 39;
    chai.expect(cmudict.phones).to.be.an("array");
    chai.expect(cmudict.phones).to.have.length(expected_length);
  });
});

describe("#symbols()", () => {
  it("should return a list of symbols", () => {
    const expected_length = 84;
    chai.expect(cmudict.symbols).to.be.an("array");
    chai.expect(cmudict.symbols).to.have.length(expected_length);
  });
});

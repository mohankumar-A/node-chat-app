const expect = require("expect");
const {isRealString} = require("./validation");

describe("isRealSting", ()=>{

    it("should reject non string value", ()=>{
        let str = 123122;
        let result = isRealString(str);
        expect(result).toBeA("boolean");
        expect(result).toBe(false);
    });

    it("should reject string with only spaces", ()=>{
        let str = "    ";
        let result = isRealString(str);
        expect(result).toBeA("boolean");
        expect(result).toBe(false);
    });

    it("should accept string with non-space character", ()=>{
        let str = "   string   ";
        let result = isRealString(str);
        expect(result).toBeA("boolean");
        expect(result).toBe(true);
    });

});
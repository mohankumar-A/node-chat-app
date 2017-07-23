let expect = require("expect");
let {generateMessage} = require("./message");


describe("generateMessage", () => {

    it("should generate correct message", ()=>{
        let from = "aadmin";
        let text = "this is test message";
       let message = generateMessage(from, text);
       // expect(message.from).toBe(from);
       // expect(message.text).toBe(text);
        //above also same
       expect(message).toInclude({from, text});
       expect(message.createdAt).toBeA("number");
    });

});
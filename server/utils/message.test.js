let expect = require("expect");
let {generateMessage, generateLocationMessage} = require("./message");


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

describe("generateLocationMessage", () => {
   it("should generate correct location object", () => {
      let lat = 1;
      let long = 1;
      let url = `https://www.google.com/maps?q=${lat},${long}`;
      let from = "admin"
      let locationMessage = generateLocationMessage(from, lat, long);

      expect(locationMessage.createdAt).toBeA("number");
      expect(locationMessage.from).toBe(from);
      expect(locationMessage.url).toBe(url);
   });
});
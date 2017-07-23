const expect = require("expect");
const {Users} = require("./users");


describe("Users", ()=>{
    let users;

    beforeEach(()=>{
        users = new Users();

        users.users = [{
            id: 1,
            name: "mike",
            room: "fb"
        },{
            id: 2,
            name: "jen",
            room: "wt"
        },{
            id: 3,
            name: "julie",
            room: "fb"
        }];
    });

    it("should add new user", ()=>{
       let users = new Users();

       let user = {
           id: 1,
           name: "mohan",
           room: "fun group"
       };

       let resUser = users.addUser(user.id, user.name, user.room);

       expect(users.users).toEqual([user]);

    });

    it("should remove user from the list", () => {
        let userId = 1;
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove the user", ()=>{
        let userId = 55;
        let user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it("should find and get the user", ()=>{
        let userId = 1;
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it("should not find and get the user", () => {
        let userId = 10;
        let user = users.getUser(userId);
        // expect(user).toBe(undefined);
        expect(user).toNotExist();
    });

    it("should get all the users in the fb room", ()=>{
       let getUsers = users.getUserList("fb");

       expect(getUsers).toEqual(["mike", "julie"]);
    });

    it("should get all the users in the wt room", ()=>{
       let getUsers = users.getUserList("wt");

       expect(getUsers).toEqual(["jen"]);
    });

});

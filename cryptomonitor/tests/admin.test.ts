import Admin from "../src/admin"

describe("Admin", () => {

    describe("initialize", () => {
        it ("should be created with email and password", () => {
            const admin = new Admin("my_new_admin@mail.com", "mypassword1234");

            expect(admin).toBeInstanceOf(Admin);
            expect(admin.email).toStrictEqual("my_new_admin@mail.com");
        });
    });

    describe("login", () => {
        it ("should login a user with valid credentials", () => {
            const admin = new Admin("my_new_admin@mail.com", "mypassword1234");

            expect(
                admin.login("my_new_admin@mail.com", "mypassword1234")
            ).toStrictEqual(true);
        });

        it ("should not login a user with invalid credentials", () => {
            const admin = new Admin("my_new_admin@mail.com", "mypassword1234");

            expect(
                admin.login("my_old_mail@outlook.com", "mypassword1234")
            ).toStrictEqual(false);

            expect(
                admin.login("my_new_admin@mail.com", "iforgotmypassword")
            ).toStrictEqual(false);
        });
    });
});
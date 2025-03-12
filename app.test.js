const request = require("supertest");
const app = require("../src/app");

describe("Event Planner API", () => {
    let token;

    beforeAll(async () => {
        await request(app).post("/register").send({ username: "test", password: "password123" });
        const res = await request(app).post("/login").send({ username: "test", password: "password123" });
        token = res.body.token;
    });

    test("User should be able to create an event", async () => {
        const res = await request(app)
            .post("/events")
            .set("Authorization", token)
            .send({ name: "Meeting", description: "Project discussion", date: "2025-03-15", time: "10:00", category: "Meetings", reminder: "30 minutes before" });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Event created successfully");
    });

    test("User should be able to view events", async () => {
        const res = await request(app)
            .get("/events")
            .set("Authorization", token);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

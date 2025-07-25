import express from "express";
const app = express();
app.use(express.json()) // middleware
const port = 3000;

const mockUsers = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "user" },
    { id: 4, name: "Diana", role: "moderator" },
    { id: 5, name: "Ethan", role: "user" },
    { id: 6, name: "Fiona", role: "admin" },
    { id: 7, name: "George", role: "moderator" },
    { id: 8, name: "Hannah", role: "user" }
];

const mockProducts = [
    { id: 101, name: "Chicken Breast", price: 12.99 },
    { id: 102, name: "Ground Beef", price: 10.49 },
    { id: 103, name: "Tofu Block", price: 4.25 }
];

// Users endpoint with optional filtering
app.get("/api/users", (request, response) => {
    console.log(request.query);
    const { filter, value } = request.query;

    if (!filter || !value) {
        return response.send(mockUsers);
    }

    const filteredUsers = mockUsers.filter((user) =>
        user[filter]?.toLowerCase().includes(value.toLowerCase())
    );

    return response.send(filteredUsers);
});

app.post("/api/users", (request, response) => {
    console.log(request.body);
    const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
})

// Products endpoint
app.get("/api/products", (request, response) => {
    response.send(mockProducts);
});

// Root endpoint
app.get("/", (request, response) => {
    response.send("Welcome to the Express API!");
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

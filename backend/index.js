const http = require("http");
const dotenv = require("dotenv");

const addTodo = require("./services/addTodo");
const deleteTodo = require("./services/deleteTodo");
const getAllTodos = require("./services/getAllTodos");
const updateTodo = require("./services/updateTodo");
const updateTodoDone = require("./services/updateTodoDone");

// jnjel handleRequsts teghy es dnel petqi vroviranc argumentere poxel :)

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    const url = req.url;
    const method = req.method.toUpperCase();

    if (url === "/todos" && method === "GET") {
        try {
            const todos = await getAllTodos();
            const data = JSON.stringify(todos);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        } catch (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
        }
    }

    if (url === "/addTodo" && method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", async () => {
            try {
                const newTodo = JSON.parse(body);
                const todos = await addTodo(newTodo);
                const data = JSON.stringify(todos);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(data);
            } catch (err) {
                console.error(err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            }
        });
    }

    if (url === "/deleteTodo" && method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", async () => {
            try {
                const deleteTodoID = JSON.parse(body);
                await deleteTodo(deleteTodoID);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end("deleted");
            } catch (err) {
                console.error(err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            }
        });
    }

    if (url === "/updateTodo" && method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", async () => {
            try {
                const updateTodoData = JSON.parse(body);
                await updateTodo(updateTodoData);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end("updated");
            } catch (err) {
                console.error(err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            }
        });
    }

    if (url === "/updateTodoDone" && method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", async () => {
            try {
                const updateTodoId = JSON.parse(body);
                await updateTodoDone(updateTodoId);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end("updated");
            } catch (err) {
                console.error(err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
            }
        });
    }
});

server.listen(PORT, () => console.log(`server started on PORT ${PORT}`));

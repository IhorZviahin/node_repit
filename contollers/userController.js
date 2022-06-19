const {fileService} = require("../services");

async function getAllUsers(req, res) {
    try {
        const users = await fileService.reader();
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
};

async function getUserById(req, res) {
    try {
        const {userId} = req.params;
        const users = await fileService.reader();
        const user = users.find((user) => user.id === +userId);
        if (!user) {
            return res.status(400).json("Search valid user");
        }
        res.json(user);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
}

async function CreateUser(req, res) {
    try {
        const {name, age} = req.body;
        if (age < 0) {
            return res.status(400).json("Set valid age");
        }
        if (!name) {
            return res.status(400).json("Set valid name");
        }
        const users = await fileService.reader();
        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};
        await fileService.write([...users, newUser]);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
}

async function DeleteUser(req, res) {
    try {
        const {userId} = req.params;
        const users = await fileService.reader();

        const index = users.findIndex((user) => user.id === +userId);
        if (index === -1) {
            return res.status(400).json("Search valid user");
        }

        users.splice(index, 1)
        await fileService.write(users);
        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
}

async function UpdateUser(req, res) {
    try {
        const {name, age} = req.body;
        const {userId} = req.params;

        if (age && age < 0) {
            return res.status(400).json("Set valid age");
        }
        if (name && name.length < 3) {
            return res.status(400).json("Set valid name");
        }

        const users = await fileService.reader();

        const index = users.findIndex((user) => user.id === +userId)

        if (index === -1) {
            return res.status(400).json("Search valid user");
        }
        // const UpdatedUser = {...users[index], ...req.body}
        const UpdatedUser = Object.assign(users[index], req.body)
        users.splice(index, 1)
        await fileService.write([...users, UpdatedUser]);
        res.status(201).json(UpdatedUser);
    } catch (e) {
        res.status(400).json(e.message || "Unknown Error")
    }
}

module.exports = {
    CreateUser,
    DeleteUser,
    getAllUsers,
    getUserById,
    UpdateUser
}
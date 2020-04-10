const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function checkRepositoryId (request, response, next) {
  const { id } = request.params;
  const repository = repositories.find(r => r.id === id);

  if (!repository) {
    return response.status(400).json({ error: 'Repository not found.'});
  };

  return next();
}

app.use("/repositories/:id", checkRepositoryId);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  let repository = repositories.find(r => r.id === id);

  repository = {
    ...repository,
    title,
    url,
    techs,
  };

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(r => r.id === id);

  repositories.splice(repositoryIndex);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(r => r.id === id);

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;

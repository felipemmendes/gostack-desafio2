const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(r => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  };

  const currentRepository = repositories[repositoryIndex];
  
  const updatedRepository = {
    ...currentRepository,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(r => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  };

  repositories.splice(repositoryIndex);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(r => r.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.'})
  };

  const currentRepository = repositories[repositoryIndex];
  const { likes } = currentRepository;
  addLikes = likes + 1

  const updatedRepository = {
    ...currentRepository,
    likes: addLikes,
  }

  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

module.exports = app;

const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateIndex(request, response, next)
{
  const { id } = request.params;

  index = repositories.findIndex(value => value.id === id);

  if (index < 0) {
    return response.status(400).json({message: 'not found'});
  }

  request.RepositoryIndex = index;

  return next();
}

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
  return response.status(200).json(repository);
});

app.put("/repositories/:id", validateIndex, (request, response) => {
  repository = { title, url, techs } = request.body

  repositories[request.RepositoryIndex] = {
    id: repositories[request.RepositoryIndex].id,
    title,
    url,
    techs,
    likes: repositories[request.RepositoryIndex].likes
  }
  return response.json(repositories[request.RepositoryIndex]);
});

app.delete("/repositories/:id", validateIndex, (request, response) => {
  repositories.splice(request.RepositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", validateIndex, (request, response) => {
  repositories[request.RepositoryIndex].likes++;
  return response.json(repositories[request.RepositoryIndex]);

});

module.exports = app;

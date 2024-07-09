export const getAllJokes = async () => {
  return fetch("http://localhost:8088/jokes").then((response) =>
    response.json()
  );
};

export const addJokeToAPI = async (jokeObject) => {
  return fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  });
};

// new function to return a fetch call with the PUT method
export const updateJoke = async (jokeObject) => {
  return fetch(`http://localhost:8088/jokes/${jokeObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  });
};

// new function to return a fetch call with the DELETE method
export const deleteJoke = async (jokeObject) => {
  return fetch(`http://localhost:8088/jokes/${jokeObject.id}`, {
    method: "DELETE",
  });
};

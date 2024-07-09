import { useEffect, useState } from "react";
import "./App.css";
import {
  addJokeToAPI,
  deleteJoke,
  getAllJokes,
  updateJoke,
} from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [showAllJokes, setShowAllJokes] = useState([]);
  const [newJoke, setNewJoke] = useState("");
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  // initial fetch of all jokes
  useEffect(() => {
    getAllJokes().then((allJokes) => {
      setShowAllJokes(allJokes);
      setUntoldJokes(allJokes.filter((joke) => joke.told === false));
      setToldJokes(allJokes.filter((joke) => joke.told === true));
    });
  }, []);

  // handle input change
  useEffect(() => {
    getAllJokes().then((allJokes) => {
      setShowAllJokes(allJokes);
      setUntoldJokes(allJokes.filter((joke) => joke.told === false));
      setToldJokes(allJokes.filter((joke) => joke.told === true));
    });
  }, [newJoke]);

  const handleInputChange = (event) => {
    setNewJoke(event.target.value);
  };

  // function to handle submit
  const handleSubmit = async () => {
    if (newJoke === "") {
      return alert("Please enter a joke");
    } else {
      const jokeObj = { text: newJoke, told: false };
      await addJokeToAPI(jokeObj);
      setNewJoke(""); // clear the input
      const updatedJokes = await getAllJokes(); // update new jokes
      setShowAllJokes(updatedJokes);
      setUntoldJokes(updatedJokes.filter((joke) => joke.told === false));
      setToldJokes(updatedJokes.filter((joke) => joke.told === true));
    }
  };

  // function to toggle jokes
  const handleToggle = async (joke) => {
    const updatedJoke = { ...joke, told: !joke.told };
    await updateJoke(updatedJoke);
    const updatedJokes = await getAllJokes();
    setShowAllJokes(updatedJokes);
    setUntoldJokes(updatedJokes.filter((joke) => joke.told === false));
    setToldJokes(updatedJokes.filter((joke) => joke.told === true));
  };

  // function to delete jokes
  const handleDelete = async (joke) => {
    await deleteJoke(joke);
    const updatedJokes = await getAllJokes();
    setShowAllJokes(updatedJokes);
    setUntoldJokes(updatedJokes.filter((joke) => joke.told === false));
    setToldJokes(updatedJokes.filter((joke) => joke.told === true));
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>

        <h2 className="app-heading-text">Add a Joke!</h2>
      </div>

      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={newJoke}
          placeholder="New One Liner"
          onChange={handleInputChange}
        />

        <button className="joke-input-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="jokes-lists-container">
        <div className="app-heading joke-list-container">
          <h2>
            Untold Jokes:{" "}
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
        </div>
        <ul>
          {untoldJokes.map((joke) => (
            <li key={joke.id} className="joke-list-item">
              <p className="joke-list-item-text">{joke.text}</p>
              <div className="joke-list-action-delete">
                <button onClick={() => handleDelete(joke)}>🗑️</button>
              </div>
              <div className="joke-list-action-toggle">
                <button onClick={() => handleToggle(joke)}>🙁</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="app-heading joke-list-container">
        <h2>
          Told Jokes: <span className="told-count">{toldJokes.length}</span>
        </h2>
      </div>
      <ul>
        {toldJokes.map((joke) => (
          <li key={joke.id} className="joke-list-item">
            <p className="joke-list-item-text">{joke.text}</p>
            <div className="joke-list-action-delete">
              <button onClick={() => handleDelete(joke)}>🗑️</button>
            </div>
            <div className="joke-list-action-toggle">
              <button onClick={() => handleToggle(joke)}>😊</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

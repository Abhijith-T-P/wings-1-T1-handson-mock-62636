import React, { useEffect, useState } from "react";

function App() {
  const [agenda, setAgenda] = useState([
    {
      title: "Angular",
      description: "Some description about the angular",
      topics: [
        "Introduction",
        "Typescript",
        "Why Angular?",
        "Understanding Versions",
        "Fundamentals",
      ],
    },
    {
      title: "Vue",
      description: "Some description about the vue",
      topics: [
        "Introduction",
        "Javascript",
        "Why Vue?",
        "Vue Bindings",
        "Component Interaction",
      ],
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState([]);
  const [topicInput, setTopicInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [viewAgenda, setViewAgenda] = useState(false);

  const addTopic = () => {
    if (topicInput.trim() !== "") {
      setTopic([...topic, topicInput]);
      setTopicInput("");
      console.log(topic); // Corrected console.log
    }
  };

  const removeTopic = (index) => {
    const newTopic = [...topic];
    newTopic.splice(index, 1);
    setTopic(newTopic);
  };

  useEffect(() => {
    console.log(agenda);
  }, [agenda]);

  const submitAgenda = (e) => {
    setFormSubmitted(true);
    e.preventDefault();
    if (title.trim() !== "" && description.trim() !== "") {
      const newAgendaItem = {
        title: title.trim(),
        description: description.trim(),
        topics: topic,
      };
      setAgenda([...agenda, newAgendaItem]);
      setTitle("");
      setDescription("");
      setTopic([]);
      setFormSubmitted(false);
    }
  };

  const display = () => {
    setViewAgenda(!viewAgenda);
  };

  const removeAgendaItem = (index) => {
    const newAgenda = [...agenda];
    newAgenda.splice(index, 1);
    setAgenda(newAgenda);
  };

  return (
    <div>
      {/* Input Form */}
      {!viewAgenda && (
        <form onSubmit={submitAgenda}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {formSubmitted && title.trim() === "" && (
            <small className="text-danger" data-testid="invalidTitle">
              Title is required
            </small>
          )}
          <br />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {formSubmitted && description.trim() === "" && (
            <small className="text-danger" data-testid="invalidDescription">
              Description is required
            </small>
          )}
          <br />
          <input
            type="text"
            placeholder="Add Topic"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <button type="button" onClick={addTopic}>
            Add Topic
          </button>
          <ul>
            {topic.length > 0 &&
              topic.map((t, index) => (
                <li key={index}>
                  {t}
                  <button onClick={() => removeTopic(index)}>x</button>
                </li>
              ))}
          </ul>
          <button type="submit">Submit Agenda</button>
        </form>
      )}
      <button onClick={display}>
        {viewAgenda ? "Add" : "Show"}
      </button>
      {viewAgenda && (
        <div>
          {agenda.map((item, index) => (
            <div key={index}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <ul>
                {item.topics.map((topics, topicIndex) => (
                  <li key={topicIndex}>{topics}</li>
                ))}
              </ul>
              <button onClick={() => removeAgendaItem(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
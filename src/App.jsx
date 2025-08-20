import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  setLoading(true);

  try {
    const res = await fetch("https://chatbot-backend-h5dt.onrender.com/setUserQuery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_query: query }),
  });

    const data = await res.json();

    setQueries((prev) => [data, ...prev]);
    setQuery("");
  } catch (error) {
    console.error("Error submitting query:", error);
  } finally {
    setLoading(false);
  }
};

const fetchQueries = async () => {
  try {
    const res = await fetch("https://chatbot-backend-h5dt.onrender.com/getUserQueries");
    const data = await res.json();
    setQueries(data.reverse());
  } catch (error) {
    console.error("Error fetching queries:", error);
  }
};


  return (
    <div className="app">
      <h1>Welcome to the ChatBOT Application!</h1>

      {/* Query Form */}
      <form onSubmit={handleSubmit} className="query-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Ask Anything..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      <button onClick={()=>{fetchQueries() , setShow(!show)}} className="fetch-btn">
        Get All Queries
      </button>

      {/* Display Queries */}
      <div className="queries">
        {queries.length > 0 ? (
          queries.map((item, index) => (
            <div key={index} className="query-card">
              <p><strong>Question:</strong> {item.user_query}</p>
              <p><strong>Answer:</strong> {item.query_answer}</p>
            </div>
          ))
        ) : (
          <p>No queries yet. Ask something!</p>
        )}
      </div>
    </div>
  );
}

export default App;

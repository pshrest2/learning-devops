import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = useCallback(async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  }, [setValues]);

  const fetchIndexes = useCallback(async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  }, [setSeenIndexes]);

  const fetchAll = useCallback(async () => {
    await fetchValues();
    await fetchIndexes();
  }, [fetchIndexes, fetchValues]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await axios.post("/api/values", { index });
      await fetchAll();
    },
    [fetchAll, index]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(", ")}

      <h3>Calculated Values:</h3>
      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          For index {key}, the calculated value is {value}
        </div>
      ))}
    </div>
  );
};

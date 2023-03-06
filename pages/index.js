import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit() {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUserInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>ChatGPT</title>
      </Head>

      <main className={styles.main}>
          <h3>Input your problem</h3>
          <form>
            <textarea
              type="text"
              name="writing"
              placeholder="Enter an problem"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </form>
        <input type="submit" value="submit" onClick={() => onSubmit()}/>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

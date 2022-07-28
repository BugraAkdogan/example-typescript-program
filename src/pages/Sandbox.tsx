import { useEffect, useState } from "react";

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();

  useEffect(() => {
    setLoading(true);
    Greet()
      .then((res) => {
        return setResponse(`${res} :)`);
      })

      .catch((err) => console.error(`gaddamn, an error occured: ${err}`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Sandbox</h1>
      <p>{!loading ? response : "I'm loading, hold your goddamn horses"}</p>
    </div>
  );
};

/**
 * Greet the user.
 * @returns `Promise` of `string`.
 */
async function Greet(): Promise<string> {
  const currentSecond = new Date().getSeconds();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   if (currentSecond % 3 === 0) {
      //     reject("wrong time, biatch");
      //   }
      resolve("Hello, world!");
    }, 1000);
  });
}

export const getErrorTextFromResponse = (err) => {
  return (
    err
      .match(/<pre>Error:.*?<br>/)[0]
      .replace(/<br>/, "")
      .replace(/<pre>/, "") || "Unknown error occurred"
  );
};

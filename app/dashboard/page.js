export default async function Dashboard() {
  const response = await fetch("http://localhost:8000/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    revalidate: 10,
  });
  const movieData = await response.json();

  if (!movieData?.movies) {
    return <p>...loading</p>;
  }

  return (
    <>
      <h1>Welcome to Dashboard page</h1>
      <ul>
        {movieData.movies.map((item, index) => (
          <li key={index}>
            <p>
              <strong style={{ color: "red" }}>Movie Title:</strong>{" "}
              {item.title}
            </p>
            <p>
              <strong>Cast:</strong> {item.cast.join(", ")}
            </p>
            <p>
              <strong>Year:</strong> {item.year}
            </p>
            <p>
              <strong>Genres:</strong> {item.genres.join(", ")}
            </p>
            <p>
              <strong>Languages:</strong> {item.languages.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
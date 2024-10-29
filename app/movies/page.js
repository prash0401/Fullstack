import Link from "next/link";

export default async function Movies({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const itemsPerPage = parseInt(searchParams.limit) || 10;

  const response = await fetch(
    `http://localhost:8000/movies?page=${page}&limit=${itemsPerPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const movieData = await response.json();
  const movies = movieData.movies || [];
  const totalCount = movieData.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <h1>Welcome to Movies page</h1>
      <ul>
        {movies.map((item, index) => (
          <li key={item._id}>
            <p>
              <strong style={{ color: "red" }}>Movie Title:</strong>{" "}
              <Link href={`/movies/${item._id}`}>{item.title}</Link>
            </p>

            {/* <p>
              <strong>Cast:</strong> {item.cast.join(", ")}
            </p>
            <p>
              <strong>Year:</strong> {item.year}
            </p> */}
            {/* <p>
              <strong>Genres:</strong> {item.genres.join(", ")}
            </p>
            <p>
              <strong>Languages:</strong> {item.languages.join(", ")}
            </p> */}
          </li>
        ))}
      </ul>

      <div>
        {page > 1 && (
          <Link href={`/movies?page=${page - 1}&limit=${itemsPerPage}`}>
            <button>Prev</button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/movies?page=${page + 1}&limit=${itemsPerPage}`}>
            <button>Next</button>
          </Link>
        )}
      </div>
    </>
  );
}

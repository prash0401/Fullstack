import Image from "next/image";

export default async function MovieById(props) {
  const { id } = props.params;
  const response = await fetch(`http://localhost:8000/movies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("data", data.data.poster);

  return (
    <>
      <h1>hi</h1>
      <Image src={data.data.poster} width={100} height={100}></Image>
    </>
  );
}

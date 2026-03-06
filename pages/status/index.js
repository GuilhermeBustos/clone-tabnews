import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const database = data.dependencies.database;

  return (
    <>
      <h1>Status Page</h1>
      <p>Last update: {new Date(data.updated_at).toLocaleString("pt-BR")}</p>
      <section>
        <h2>Database health:</h2>
        <p>Version: {database.version}</p>
        <p>Opened connections: {database.opened_connections}</p>
        <p>Max connections: {database.max_connections}</p>
      </section>
    </>
  );
}

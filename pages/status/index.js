import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>System status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Loading...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Last update: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Loading...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Version: {data.dependencies.database.version}</div>
        <div>
          Opened connections: {data.dependencies.database.opened_connections}
        </div>
        <div>Max connections: {data.dependencies.database.max_connections}</div>
      </>
    );

    return (
      <>
        <h2>Database health:</h2>
        {databaseStatusInformation}
      </>
    );
  }
}

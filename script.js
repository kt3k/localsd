function delay(n) {
  return new Promise(resolve => setTimeout(resolve, n))
}
async function main() {
  const container = document.getElementById("service-list");
  let text

  while (true) {
    const newText = await (await fetch("/api")).text();
    if (newText !== text) {
      text = newText
      buildDom(container, JSON.parse(text))
    }

    await delay(1000)
  }
}


function buildDom(container, services) {
  container.innerHTML = ''
  for (const { service, port, description } of services) {
    const child = document.createElement("div");
    const url = `http://localhost:${port}`;
    child.innerHTML = `
      <p>
        <strong>${service}</strong>
        <a href="${url}">${url}</a>
      </p>
      ${description ? `<p>${description}</p>` : ""}
      <hr />
    `;
    container.appendChild(child);
  }
}

main();

async function main() {
  const container = document.getElementById('service-list')
  const services = await (await fetch('/api')).json()

  for (const { service, port, description } of services) {
    const child = document.createElement('div')
    const url = `http://localhost:${port}`
    child.innerHTML = `
      <p>
        <strong>${service}</strong>
        <a href="url">${url}</a>
      </p>
      ${description ? `<p>${description}</p>` : ''}
      <hr />
    `
    container.appendChild(child)
  }
}

main()

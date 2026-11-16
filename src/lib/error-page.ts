export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap" />
    <style>
      :root { --background: #FFFFFF; --foreground: #0A0A0A; --muted: #5C5C66; --line: #E6E6E3; }
      body { font: 18px/1.6 "Inter Tight", sans-serif; background: var(--background); color: var(--foreground); display: grid; place-items: center; min-height: 100dvh; box-sizing: border-box; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font: 600 32px/1.1 "Inter Tight", sans-serif; margin: 0 0 0.5rem; }
      p { color: var(--muted); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: 600 16px/1.6 "Inter Tight", sans-serif; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: var(--foreground); color: var(--background); }
      .secondary { background: var(--background); color: var(--foreground); border-color: var(--line); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}

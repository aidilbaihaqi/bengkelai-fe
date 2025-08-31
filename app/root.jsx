import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import "./tailwind.css";

export default function App() {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-950 text-white antialiased overflow-x-hidden">
        {/* Glass Background Gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,#1f2937_0%,#0b1220_60%)] -z-10" />
        
        {/* Subtle Noise Overlay */}
        <div className="fixed inset-0 opacity-[0.015] bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjI3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjciIGN5PSIyNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjI3IiBjeT0iMjciIHI9IjEiLz48Y2lyY2xlIGN4PSI0NyIgY3k9IjI3IiByPSIxIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjQ3IiByPSIxIi8+PGNpcmNsZSBjeD0iMjciIGN5PSI0NyIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ3IiBjeT0iNDciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==)] -z-10" />
        
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}

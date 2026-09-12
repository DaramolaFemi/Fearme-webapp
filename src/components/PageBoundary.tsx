import { Component, type ReactNode } from "react";

export default class PageBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="poem-page">
          <h1>This page could not load.</h1>
          <p>Please reload the page to try again.</p>
          <button className="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
          <p>
            <a className="text-link" href="mailto:daramola772@gmail.com">
              Email Daramola Femi
            </a>
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}

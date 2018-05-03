import React from 'react'

export const Page = ({ children, title }) => (
  <section>
    <div className="page-header">
      <h1 className="page-title">{ title }</h1>
    </div>
    { children }
  </section>
)

export const PageError = ({ code }) => (
  <section className="page-content mt-9">
    <div className="container text-center">
      <div className="display-1 text-muted mb-5">
        <i className="si si-exclamation"></i> { code }
      </div>
      <h1 className="h2 mb-3">
        Oops.. You just found an error page..
      </h1>
      <p className="h4 text-muted font-weight-normal mb-7">
        We are sorry but our service is currently not available…
      </p>
    </div>
  </section>
)

export const PageNotFound = () => (
  <PageError code={404} />
)

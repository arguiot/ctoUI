export default {
    repository: 'https://github.com/arguiot/ctoUI', // project repo
    docsRepository: 'https://github.com/arguiot/ctoUI', // docs repo
    branch: 'master', // branch of docs
    path: '/docs', // path of docs
    titleSuffix: ' – CTO UI',
    nextLinks: true,
    prevLinks: true,
    search: true,
    customSearch: null, // customizable, you can use algolia for example
    darkMode: true,
    footer: true,
    footerText: 'MIT 2020 © Arthur Guiot.',
    footerEditOnGitHubLink: true, // will link to the docs repo
    logo: <>
      {/* <svg>...</svg> */}
      <span>CrypTool Online</span>
    </>,
    head: <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="CTO UI is an application architecture framework that CrypTool uses to create and maintain its plugins on CrypTool Online." />
      <meta name="og:title" content="CTO UI - CrypTool Online" />
    </>
}
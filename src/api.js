export const getData = () => fetch('http://localhost:3000').then((data) => data.json);
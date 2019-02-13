const jq = (results) => {
  for (const log of results) {
    console.log(JSON.stringify(log, null, 2))
  }
}

export default jq

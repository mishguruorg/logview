# Log View GraphQL API

### Running

```
npm run build
mish run --env internal -- npm start
```

Open http://localhost:4000


### Getting a specific log

```
query {
  log(id: 18708208) {
    type
  }
}
```

```
{
  "data": {
    "log": {
      "type": "instagramReelsTrayUpToDate",
    }
  }
}
```

### Getting multiple specific logs

```
query {
  logs(ids: [18708205, 18708206]) {
    type
  }
}
```

```
{
  "data": {
    "logs": [
      {
        "type": "syncInstagramReelsTray",
      },
      {
        "type": "syncInstagramThreads",
      }
    ]
  }
}
```

### Filtering logs

*Get the last 5 logs*

```
query {
  filter(input: { last: 5 }) {
    results {
      type
    }
  }
}
```

*Get the last 5 logs for a specific user*

```
query {
  filter(input: { last: 5, userId: 43 }) {
    results {
      type
    }
  }
}
```

*Get the last 5 logs "unexpectedError" logs*

```
query {
  filter(input: { last: 5, type: "unexpectedError" }) {
    results {
      type
    }
  }
}
```

*Get the last 5 logs for a specific account (by matching the payload)*

```
query {
  filter(input: { last: 5, payload:"%\"instagramAccountId\":21%"}) {
    results {
      type
    }
  }
}
```

*Get the last 5 logs before a specific time*

```
query {
  filter(input: { last: 5, sentBefore: "2019-02-02T00:00:00Z" }) {
    results {
      type
    }
  }
}
```

### Pagination

The API uses cursors to reliably paginate through logs, supporting any of the
filter arguments, and is not affected by new logs being inserted while reading.

*Initial query*

```
query {
  filter(input: { last: 5 }) {
    cursors {
      hasNext
      after
		}
    results {
      id
    }
  }
}
```

```
{
  "data": {
    "filter": {
      "cursors": {
        "hasNext": true,
        "after": "WzE4NzA4MjMzXQ=="
      },
      "results": [
        {
          "id": 18708237
        },
        {
          "id": 18708236
        },
        {
          "id": 18708235
        },
        {
          "id": 18708234
        },
        {
          "id": 18708233
        }
      ]
    }
  }
}
```

*Getting the next page*

```
query {
  filter(input: { last: 5, after: "WzE4NzA4MjMzXQ==" }) {
    cursors {
      hasNext
      after
		}
    results {
      id
    }
  }
}
```

```
{
  "data": {
    "filter": {
      "cursors": {
        "hasNext": true,
        "after": "WzE4NzA4MjI4XQ=="
      },
      "results": [
        {
          "id": 18708232
        },
        {
          "id": 18708231
        },
        {
          "id": 18708230
        },
        {
          "id": 18708229
        },
        {
          "id": 18708228
        }
      ]
    }
  }
}
```

### Subscribing to logs

You can watch for new logs using GraphQL Subscriptions.

```
subscription {
  filter(input: { last: 5, userId: 43 }) {
    results {
      type
    }
  }
}
```

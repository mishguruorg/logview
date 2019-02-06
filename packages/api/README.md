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
    name
    info
  }
}
```

```
{
  "data": {
    "log": {
      "name": "instagramReelsTrayUpToDate",
      "info": "InstagramAccount 21 is up to date with what is in Instagram reels tray"
    }
  }
}
```

### Getting multiple specific logs

```
query {
  logs(ids: [18708205, 18708206]) {
    name
    info
  }
}
```

```
{
  "data": {
    "logs": [
      {
        "name": "syncInstagramReelsTray",
        "info": "syncInstagramReelsTray has been manually fired for InstagramAccount 21"
      },
      {
        "name": "syncInstagramThreads",
        "info": "syncInstagramThreads has been manually fired for InstagramAccount 21"
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
      name
      info
    }
  }
}
```

*Get the last 5 logs for a specific user*

```
query {
  filter(input: { last: 5, userId: 43 }) {
    results {
      name
      info
    }
  }
}
```

*Get the last 5 logs "unexpectedError" logs*

```
query {
  filter(input: { last: 5, name: "unexpectedError" }) {
    results {
      name
      info
    }
  }
}
```

*Get the last 5 logs with "productAnalytics" in the info string*

```
query {
  filter(input: { last: 5, info:"%productAnalytics%" }) {
    results {
      name
      info
    }
  }
}
```

*Get the last 5 logs for a specific account*

```
query {
  filter(input: { last: 5, jsonString:"%\"instagramAccountId\":21%"}) {
    results {
      name
      info
    }
  }
}
```

*Get the last 5 logs before a specific time*

```
query {
  filter(input: { last: 5, createdBefore: "2019-02-02T00:00:00Z" }) {
    results {
      name
      info
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

Subscriptions work with any of the filter arguments, though strange things
happen if you pass `createdBefore`, `after` or `before` fields.

```
subscription {
  filter(input: { last: 5, userId: 43 }) {
    results {
      name
    }
  }
}
```

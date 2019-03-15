# Log View CLI

## Installation

```
npm install -g @mishguru/logview-cli
```

## Usage

```
$ logv --help

Display a list of logs

Commands:
  logv edit-config   Open the server config in your editor
  logv read [ids..]  Display details about selected logs
  logv filter        Display a list of logs                            [default]

Options:
  --version       Show version number                                  [boolean]
  --server        Which server to use from the config
                                             [choices: "internal", "production"]
  --help          Show help                                            [boolean]
  --follow, -f    Append new logs as they are created [boolean] [default: false]
  --lines, -l     Number of logs to retrieve              [number] [default: 20]
  --format                                          [string] [default: "pretty"]
  --user, -u      A list of user IDs to filter logs by                   [array]
  --sentFrom, -s  A list of service names to filter logs by              [array]
  --type, -t      A list of topic type to filter logs by                 [array]
  --payload, -p   Filter logs by payload using SQL LIKE                 [string]
  --before, -b    Only display logs created before the specified date   [string]
  --after, -a     Only display logs created after the specified date    [string]
```

```
logv -l 20 -u 43
[press space to load more logs]

logv -u 43 -f
[press ctrl-c to exit]

logv read 1234 1302
12345 unexpectedError                                    24th Jan 2018, 12:42:12
> "the info is printed here"
User ID: 123, Instagram Account: 21

1302 snapchatAccountOutOfDate                            24th Jan 2018, 12:42:12
> ""
> ""
instagramAccountId | 

logv read --format jq 12354
{
	"id": "12345",
	"sentAt": "24th Jan 2018, 12:42:12",
	"type": "unexpectedError",
	"payload": {
		"info": "Something went wrong!",
		"userId": 123,
	}
}
```

Emojis for different event types?
Colors for different groups?

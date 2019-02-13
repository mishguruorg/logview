# Log View CLI

## Installation

```
npm install -g @mishguru/logview-cli
```

## Usage

```
logv --help

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]

  --follow, -f  Append new logs as they are sent in   [boolean] [default: false]
  --user, -u    A list of user IDs to filter logs by                     [array]
  --type, -t    A list of event types to filter logs by                  [array]
  --info, -i    Filter logs by info using SQL LIKE                      [string]
  --payload, -p Filter logs by the JSON payload using SQL LIKE          [string]

  --lines, -l   Number of logs to retrieve                [number] [default: 20]
  --before, -b  Only display logs sent before the specified date        [string]
  --after, -a   Only display logs sent after the specified date         [string]

	--format 			Choose how to display the log 				 [string] [default:pretty]
								pretty: Prettified log view
								json: Displays payload in JSON, with title
								jq: Only outputs JSON, useful for piping to jq
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

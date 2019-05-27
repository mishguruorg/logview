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
  logv use [server]  Set which server to use by default

Options:
  --version       Show version number                                  [boolean]
  --server        Which server to use from the config
  --help          Show help                                            [boolean]
  --follow, -f    Append new logs as they are created [boolean] [default: false]
  --lines, -n     Number of logs to retrieve              [number] [default: 20]
  --format                                          [string] [default: "pretty"]
  --user, -u      A list of user IDs to filter logs by                   [array]
  --sentFrom, -s  A list of service names to filter logs by              [array]
  --type, -t      A list of topic type to filter logs by                 [array]
  --payload, -p   Filter logs by payload using SQL LIKE                 [string]
  --before, -b    Only display logs with an ID before the specified ID  [string]
  --after, -a     Only display logs with an ID after the specified ID   [string]
  --sentBefore    Only display logs created before the specified date   [string]
  --sentAfter     Only display logs created after the specified date    [string]
```

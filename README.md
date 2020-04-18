# jira-csv

A project to modify Jira CSV exports

## Getting Started

This project was built using specific versions of Node and yarn, found in the `package.json` file. It is assumed both are installed and available.

Install dependencies:

```
$ yarn
```

Update the `mappings.js` file to match the changes you wish to make.

Modify the `Jira.csv` file to produce `JiraModified.csv`:

```
$ yarn jira
```

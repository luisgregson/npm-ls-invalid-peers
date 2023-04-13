# npm-ls-invalid-peers

`npm-ls-invalid-peers` is a command-line tool that analyzes the output of `npm ls --all` to identify packages with invalid peer dependency versions, grouped by the package on which they depend. This tool helps you easily find and fix invalid peer dependencies in your project.

## Usage

There are two ways to use `npm-ls-invalid-peers`:

### 1. Installing globally and running from a directory

Install the package globally:

```sh
npm install -g npm-ls-invalid-peers
```

Then, run the command from any directory:

```sh
npm-ls-invalid-peers
```

### 2. Running with npx

Without installing the package, run the following command from any directory:

```sh
npx npm-ls-invalid-peers
```

## Example

After running the `npm-ls-invalid-peers` command in a project, you may see output similar to the following:

```
react@17.0.2
  -  @blueprintjs/datetime requires: "^15.3.0 || 16" 
  -  @blueprintjs/select requires: ^15.3.0 || 16"
  -  ...
react-dom@17.0.2
  - @blueprintjs/datetime: "^15.3.0 || 16" 
  - ...
```
This output shows the packages with invalid peer dependencies, grouped by the packages on which they depend.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

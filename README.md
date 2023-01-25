# @prosegrinder/cmudict

A versioned typescript wrapper package for
[CMUdict](https://github.com/cmusphinx/cmudict).

Based on my [python-cmudict](https://github.com/prosegrinder/python-cmudict)
package.

## Install

> This package is
> [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
> It requires Node 12+ and must be imported instead of required.

npm:

```bash
npm intall @prosegrinder/cmudict
```

## Usage

[CMUdict](https://github.com/cmusphinx/cmudict) contains 4 language-related
files, a LICENSE, and two README files. This package exposes the language and
LICENSE files as readonly properties of a single CMUDict class.

The package contains a copy of the CMUdict files locally. When the class is
instantiated, those files are read into memory. The largest (cmudict.dict) is
around 3.5M.

```typescript
import {CMUDict} from @prosegrinder/cmudict

const cmudict = new CMUDict();
```

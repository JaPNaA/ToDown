import MDParser from "../mdparser/MDParser";

class App {
    constructor() {
        document.body.innerHTML = MDParser.parseToString(
`
### did you know that...
# this is _markdown_?

_and it's <b> not </b> parsed_
at all

###### I don't see how it's parsed
yea it's **not** parsed

actually, it is

paragraph 1

paragraph 2
paragraph 2

paragraph 3
paragraph 3
paragraph 3

paragraph 4
paragraph 4
paragraph 4
paragraph 4

paragraph 5
paragraph 5
paragraph 5
paragraph 5
paragraph 5

paragraph 6
paragraph 6
paragraph 6
paragraph 6
paragraph 6
paragraph 6

`);
    }
}

export default App;
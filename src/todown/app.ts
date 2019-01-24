import MDParser from "../mdparser/MDParser";

class App {
    constructor() {
        document.body.innerHTML = MDParser.parseToString(`
            # This is markdown
            _and it's <b> not </b> parsed_
            ###### I don't see how it's parsed
        `);
    }
}

export default App;
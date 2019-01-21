import MDParser from "../mdparser/MDParser";

class App {
    constructor() {
        document.body.innerHTML = MDParser.parse(`
            # This is markdown
            _and it's <b> not </b> parsed_
            ###### I don't see how it's parsed
        `);
    }
}

export default App;
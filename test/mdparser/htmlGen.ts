import Test from "../test";
import HFactory from "../../src/mdparser/parser/htmlGen/hFactory";

const expectedInnerText = "this is a &lt;p&gt;! &lt;p&gt;! &lt;p&gt;!";

function setupEnv() {
    const root = HFactory.createRoot();
    const p = HFactory.createP();
    p.appendChild(HFactory.createText("this is a <p>! <p>! <p>!"));
    root.appendChild(p);
    return { root, p };
}

function testSingleElement(this: Test) {
    this.test("Create paragraph", function () {
        const { root, p } = setupEnv();

        this.assertEquals(
            root.toString(),
            '<p>' + expectedInnerText + '</p>'
        )
    });

    this.test("Add id", function () {
        const { root, p } = setupEnv();

        p.setId("1337");

        this.assertEquals(
            root.toString(),
            '<p id="1337">' + expectedInnerText + '</p>'
        )
    });

    this.test("Replace id", function () {
        const { root, p } = setupEnv();

        p.setId("1337");
        p.setId("thereCanOnlyBeOne");

        this.assertEquals(
            root.toString(),
            '<p id="thereCanOnlyBeOne">' + expectedInnerText + '</p>'
        )
    });

    this.test("Escape ID", function () {
        const { root, p } = setupEnv();
        p.setId("the\"paragraph\"");

        this.assertEquals(
            root.toString(),
            '<p id="the&quot;paragraph&quot;">' + expectedInnerText + '</p>'
        )
    });

    this.test("Remove id", function () {
        const { root, p } = setupEnv();

        p.setId("1337");
        p.removeId();

        this.assertEquals(
            root.toString(),
            '<p>' + expectedInnerText + '</p>'
        )
    });

    this.test("Add class", function () {
        const { root, p } = setupEnv();

        p.addClass("1337");

        this.assertEquals(
            root.toString(),
            '<p class="1337">' + expectedInnerText + '</p>'
        )
    });

    this.test("Escape class", function () {
        const { root, p } = setupEnv();

        p.addClass("\"1337>\"");

        this.assertEquals(
            root.toString(),
            '<p class="&quot;1337>&quot;">' + expectedInnerText + '</p>'
        )
    });

    this.test("Add more classes", function () {
        const { root, p } = setupEnv();

        p.addClass("1337");
        p.addClass("1338 1339");

        this.assertEquals(
            root.toString(),
            '<p class="1337 1338 1339">' + expectedInnerText + '</p>'
        )
    });

    this.test("Add attribute", function () {
        const { root, p } = setupEnv();

        p.setAttrib("contenteditable", "true");

        this.assertEquals(
            root.toString(),
            '<p contenteditable="true">' + expectedInnerText + '</p>'
        )
    });

    this.test("Remove attribute", function () {
        const { root, p } = setupEnv();

        p.setAttrib("contenteditable", "true");
        p.removeAttrib("contenteditable");

        this.assertEquals(
            root.toString(),
            '<p>' + expectedInnerText + '</p>'
        )
    });

    this.test("Remove attribute by setting undefined", function () {
        const { root, p } = setupEnv();

        p.setAttrib("contenteditable", "true");
        p.setAttrib("contenteditable", undefined);

        this.assertEquals(
            root.toString(),
            '<p>' + expectedInnerText + '</p>'
        )
    });

    this.test("Link to the best website", function() {
        const root = HFactory.createRoot();
        const a = HFactory.createA();
        a.appendChild(HFactory.createText("Go to the best website"));
        root.appendChild(a);
        
        a.addClass("item");
        a.href = "https://japnaa.github.io/";
        a.setAttrib("rel", "noopener");
        a.target = "_blank";

        this.assertContains(
            root.toString(),
            '>Go to the best website</a>',
            '<a ',
            'href="https://japnaa.github.io/"',
            'target="_blank"',
            'rel="noopener"',
            'class="item"'
        );
    });
}

const htmlGenTest = new Test(function () {
    this.test("singleElement", testSingleElement);
});

export default htmlGenTest;
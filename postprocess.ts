// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, json, excel, zip, and image files
import { readJSON, writeTXT  } from "https://deno.land/x/flat@0.0.14/mod.ts";
import { Feed } from "https://jspm.dev/feed";

const filename = Deno.args[0]; // Same name as downloaded_filename
const json = await readJSON(filename);

const myFeed = new Feed({
    title: "链闻精选",
    description: "链闻快讯及文章精选",
    link: "",
    updated: new Date()
});

const rows = json.data.list
console.log(rows)
for(const row of rows) {
    myFeed.addItem({
        title: row.title,
        link: row.source_url,
        description: row.abstract,
        date: new Date(),
    });
}


const newFilename = `data.xml`;
await writeTXT(newFilename, myFeed.rss2());

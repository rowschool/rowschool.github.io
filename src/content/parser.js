let fs = require("fs");

var directory = "./blog",
    callback = function(ctx, files) {
        var fileArray = [];

        files.forEach((file) => {
            var fileNameNoExtension = file.slice(0, file.indexOf("."))

            if (fileNameNoExtension.length > 0 && !fileArray.includes(fileNameNoExtension)) {
                fileArray.push(fileNameNoExtension);
            }
        });

        fileArray.forEach((file) => {
            var mdSource = fs.readFileSync(`blog/${file}.md`).toString();
            var jsonSource = fs.readFileSync(`blog/${file}.json`).toString();
            var jsonifiedSource = JSON.parse(jsonSource);

            var fileContent = `---
title: ${jsonifiedSource.topic}
date: ${new Date(jsonifiedSource.date).toISOString()}
description: ${jsonifiedSource.topic} - ${jsonifiedSource.big_idea}
tags: "Instructional Design", ${jsonifiedSource.big_idea}
---
<div class="old-blog-post">
  ${mdSource}
</div>
            `;

            fs.mkdirSync(`blog/${file}`);
            fs.writeFile(`blog/${file}/index.md`, fileContent);
        });
    };

fs.readdir(directory, callback);



// import file system
//
// list all files
// for each file, create a folder with the name:
//
// sluggified(yyyy-mm-dd-file.topic)
//
// create a new index.md file:
// ---
// title: file.topic
// date: new Date(file.date).toISOString()
// description: file.topic - file.big_idea
// tags: "Instructional Design", file.big_idea
// ---
//
// file.md content
//
//
//
// {
//     "date": "October 03, 2019",
//     "topic": "Understanding Types of Goals",
//     "big_idea": "Designing instruction to reach goals",
//     "slug": "2019-10-03-designing-instruction-to-reach-goals"
// }

// https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog
// https://dev.to/gabcimato/how-to-add-tags-to-your-gatsby-blog-part-1-34fk

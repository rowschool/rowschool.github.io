function sluggify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

let fs = require("fs");

var directory = "./blog",
    callback = function(ctx, files) {
        var fileArray = [];
        // console.log("a", a, "b", b);
        files.forEach((file) => {
            // console.log(file);
            var fileNameNoExtension = file.slice(0, file.indexOf("."))
            // console.log();
            if (fileNameNoExtension.length > 0 && !fileArray.includes(fileNameNoExtension)) {
                fileArray.push(fileNameNoExtension);
            }
        });

        // console.log(fileArray);

        fileArray.forEach((file) => {
            var mdSource = fs.readFileSync(`blog/${file}.md`).toString();
            var jsonSource = fs.readFileSync(`blog/${file}.json`).toString();
            var jsonifiedSource = JSON.parse(jsonSource);
            // fs.writeFileSync(distPath, template());
            // console.log("mdSource", mdSource, "jsonSource", jsonSource);
            // console.log("jsonifiedSource", jsonifiedSource.topic);

            // var date = new Date(jsonifiedSource.date);
            // var fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            // console.log("fullDate", fullDate);
            // var slug = sluggify(`${fullDate}-${jsonifiedSource.topic}`);
            // console.log("slug", slug);
            var fileContent = `
---
title: ${jsonifiedSource.topic}
date: ${new Date(jsonifiedSource.date).toISOString()}
description: ${jsonifiedSource.topic} - ${jsonifiedSource.big_idea}
tags: "Instructional Design", ${jsonifiedSource.big_idea}
---

${mdSource}
            `;

            fs.mkdirSync(`blog/${file}`);
            // console.log(fileContent);
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

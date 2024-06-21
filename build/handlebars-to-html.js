let fs = require("fs");
let glob = require("glob");
let Handlebars = require("handlebars");
let mkdirp = require("mkdirp");
let path = require("path");

function registerPartials (pattern, folderPath) {
    var files = glob.sync(pattern);

    if (!files.length) {
        throw new Error(`No partial files found for pattern ${pattern}`);
    }

    if (process.env.debug) {
        console.log("Files", files);
    }

    files.forEach(file => {
        var source = fs.readFileSync(file).toString(),
            fileName = file.replace(folderPath, "").replace(path.extname(file), "");

        Handlebars.registerPartial(fileName, source);

        if (process.env.debug) {
            console.log("File registered with name", fileName);
        }
    });
}

function grabPageTitle(template) {
    const titleTag = '<title>';
    const openTitleTagIndex = template.indexOf(titleTag);
    const closeTitleTagIndex = template.indexOf('</title>');

    return template.substring(openTitleTagIndex + titleTag.length, closeTitleTagIndex);
}

function writeFiles (pattern, folderPath, outputFolder) {
    console.log('writeFiles', 'pattern', pattern, 'folderPath', folderPath, 'outputFolder', outputFolder);
    var files = glob.sync(pattern);

    if (!files.length) {
        throw new Error(`No template files found for pattern ${pattern}`);
    }

    if (process.env.debug) {
        console.log("Templates", files);
    }

    files.forEach(file => {
        var source = fs.readFileSync(file).toString(),
            template = Handlebars.compile(source)(),
            distDirectory = path.dirname(file).replace(folderPath, ""),
            distPath;

        // Remove OGP URL meta tag from blog pages
        if (distDirectory === 'blog') {
            template = template.replace('<meta property="og:url" content="http://www.rowschool.com/" />', '');
        }

        // Modify <title> tag for blog/index page.
        if (distDirectory === 'blog' && file.includes('index.hbs')) {
            // Grab title.
            const title = grabPageTitle(template);

            // Transform the content between the <title> tags and meta OGP title tag.
            const newTitle = 'ROW School - Blog';
                                          
            template = template.replaceAll(title, newTitle);
        }

        // Add custom titles and OGP tags to blog posts.
        if (distDirectory === 'blog' && !file.includes('index.hbs')) {
            // Grab title.
            const title = grabPageTitle(template);

            // Transform the content between the <title> tags and meta OGP title tag.
            const blogPostTitleTag = '<h1 class="blog-post-title">';
            const newTitleStartIndex = template.indexOf(blogPostTitleTag);
            const newTitleEndIndex = template.indexOf('</h1>');
            const newTitle = `ROW School - Blog - ${template.substring(newTitleStartIndex + blogPostTitleTag.length, newTitleEndIndex)}`;
                                          
            template = template.replaceAll(title, newTitle);

            // Grab blog post content, generate OGP description, insert the meta OGP description tag into the template.
            const blogPostContentTag = '<article class="blog-post-content">';
            const ogpDescriptionStartIndex = template.indexOf(blogPostContentTag);
            const ogpDescriptionEndIndex = template.indexOf('</article>');
            const inadvisableRegex = /(<([^>]+)>)/ig;
            const description = template.substring(ogpDescriptionStartIndex + blogPostContentTag.length, ogpDescriptionEndIndex)
                                    .replace(inadvisableRegex, ' ')
                                    .slice(0, 200)
                                    .concat('...');
            const ogpDescription = `<meta property="og:description" content="${description}" />`;
            // Not sure what happened here, but adding +4 because the tag
            // was being inserted 4 characters before the closing </title> tag.
            const metaDescTagStartIndex = template.lastIndexOf(newTitle) + `${newTitle} " />}`.length - 1 + 4;
            
            template = template.slice(0, metaDescTagStartIndex) + `    ${ogpDescription}\n` + template.slice(metaDescTagStartIndex);
        }

        if (distDirectory === folderPath.slice(0, folderPath.length - 1)) {
            distPath = outputFolder + path.basename(file, ".hbs") + ".html";
        } else {
            distPath = outputFolder + distDirectory + path.sep + path.basename(file, ".hbs") + ".html";
        }

        mkdirp.sync(distDirectory);
        fs.writeFileSync(distPath, template);

        if (process.env.debug) {
            console.log("Template written to", distPath);
        }
    });
}

const api = {
    registerPartials,
    writeFiles
};

module.exports = api;

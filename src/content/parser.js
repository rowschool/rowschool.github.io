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

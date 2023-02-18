This is a starter template for [Learn Next.js](https://nextjs.org/learn).

You might have noticed that each markdown file has a metadata section at the top containing title and date. This is called YAML Front Matter, which can be parsed using a library called gray-matter.
First, install gray-matter which lets us parse the metadata in each markdown file.

        npm install gray-matter

Next, we’ll create a utility function for parsing data from the file system. With this utility function, we’d like to:

Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
List the data on the index page, sorted by date.
Create a top-level directory called lib in the root directory. Then, inside lib, create a file called posts.js

\_app.js to override the default App
[id].js to create dynamic path

To render markdown content, we’ll use the remark library

    npm install remark remark-html

To format the date, we’ll use the date-fns library. First, install it:

    npm install date-fns

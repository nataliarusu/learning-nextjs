import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

//process.cwd() method returns the current working directory of the Node.js process
const postsDirectory = path.join(process.cwd(), "posts"); // /Users/nataliarusu/Documents/FaC/week6/nextjs-blog/posts
console.log(process.cwd()); // /Users/nataliarusu/Documents/FaC/week6/nextjs-blog

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory); //[ 'pre-rendering.md', 'ssg-ssr.md' ]

  const allPostsData = fileNames.map((fileName) => {
    //for each file name, here comment for first only
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, ""); //pre-rendering

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName); // /Users/nataliarusu/Documents/FaC/week6/nextjs-blog/posts/pre-rendering.md

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents); //which is => {content, data:{title, date}, isEmpty, except, orig}

    // Combine the data with the id
    return {
      id,
      ...matterResult.data, //extract only data, which is {title, date}
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    //it must be an array of objects
    //Each object must have the params key and contain an object with the id key
    //(because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents); //{content, data:{title, date}, isEmpty, except, orig}

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

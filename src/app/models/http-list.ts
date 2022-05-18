export const HttpListModel = {
    languages: "pages/56",
    joshuaContents: "countries.json",
    testPost: "posts/334?acf_format=standard",
    allPosts: "posts?page=1&per_page=100&acf_format=standard",
    allPages: "pages",
    joshuaContentId(id: string){
        return `people_groups/${id}.json`;
    },
    joshuaCountryId(id: string){
        return `/countries/${id}.json`
    },
    submitPray(id: string) {
        return `https://pray.blessfrontierpeoples.org/post.php?key=1&pid=${id}&submit=submit`
    }
}
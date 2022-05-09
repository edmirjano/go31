export const HttpListModel = {
    languages: "pages/56",
    joshuaContents: "countries.json",
    testPost: "posts/334?acf_format=standard",
    allPosts: "posts?page=1&per_page=100&acf_format=standard",
    allPages: "pages?page=1&per_page=100&acf_format=standard",
    joshuaContentId(id: string){
        return `people_groups/${id}.json`;
    },
    joshuaCountryId(id: string){
        return `/countries/${id}.json`
    }
}
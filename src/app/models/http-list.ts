export const HttpListModel = {
    languages: "languages",
    joshuaContents: "countries.json",
    testPost: "posts/114",
    joshuaContentId(id: string){
        return `people_groups/${id}.json`;
    },
}
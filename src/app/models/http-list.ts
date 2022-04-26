export const HttpListModel = {
    languages: "languages",
    joshuaContents: "countries.json",
    testPost: "posts/43",
    joshuaContentId(id: string){
        return `people_groups/${id}.json`;
    },
}
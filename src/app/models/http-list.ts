export const HttpListModel = {
    languages: "languages",
    joshuaContents: "countries.json",
    testPost: "posts/334?acf_format=standard",
    joshuaContentId(id: string){
        return `people_groups/${id}.json`;
    },
}
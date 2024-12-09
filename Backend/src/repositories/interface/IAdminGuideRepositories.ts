export interface IAdminGuideRepository{
    

    saveGuide(guidedata:any):Promise<any>
    getAllGuides():Promise<any>


}
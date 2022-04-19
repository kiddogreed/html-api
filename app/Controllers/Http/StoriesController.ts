import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Story from 'App/Models/Story';
import StoryValidator from 'App/Validators/StoryValidator';


export default class StoriesController {
  
  public async index({response,request}:HttpContextContract){
    const filters = request.only(["title", "link"]);
    const meta = request.only(["page", "per_page"]);
    const querys = Story.query()
    if (filters.title) {
      querys.where('title', filters.title)
    }
    if (filters.link) {
      querys.where('link', filters.link)
    }
    const data = await querys.orderBy('id','desc')
      .paginate(meta.page, meta.per_page)
 
    return response.ok({
      message:"ok",
      data:data
    })
  }


  public async store({request,response}:HttpContextContract){
    const validStory = await request.validate(StoryValidator)
    if(!validStory){
      return response.badRequest({message:"invalid Stories"})
    }
    
     await Story.create({
      title: validStory.title,
      link: validStory.link,
      
    })
    return response.created({message:"Story Accepted"})

  }

  
  public async show({params, response}:HttpContextContract){
    const showStories = await Story.findOrFail(params.id)
    return response.ok({
      message:'ok',
      car_data:{
        data: {
          id:showStories.id,
          title:showStories.title,
          link: showStories.link,
          created: showStories.createdAt
        }
      },
    })
  }


  public async update({params,request, response}:HttpContextContract){

    const updateStory = await Story.findOrFail(params.id)
    const updateTitle = request.input('title')
    const updateLink = request.input('link')

    updateStory.title = updateTitle
    updateStory.link = updateLink

    updateLink.save()

    return response.accepted({message:"Stories updated"})




  }


  public async destroy({params,response}:HttpContextContract){
    const findStory = await Story.findOrFail(params.id)
    findStory.delete()

    response.accepted({
      message:"Story Removed"
    })
  }

}

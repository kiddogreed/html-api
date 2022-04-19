import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Story from 'App/Models/Story';
import cheerio from 'cheerio';


export default class HtmlsController {
  public async parse({response,request}:HttpContextContract){
    const rp = require('request-promise');
    const options = {
      uri: `https://time.com/`,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
      rp(options)
      .then(($) => {
        const stories = $('.latest-stories__item')
        stories.each((index,element)=>{
          
          const title = $(element).find('.latest-stories__item-headline')
                        .text().replace(/\s\s+/g, '')
          const link =  $(element).find('a').attr('href')     
          const url =  'https://time.com/'   
          Story.create({title:title, link:url+link})
        })

        
        
      })
      .catch((err) => {
        return response.badRequest({message:`something went wrong :: ${err}` })
      });

      return response.created({
        message:"latest Stories scraped and added to database",
        scraped_from:'https://time.com/',
        view_data:"http://127.0.0.1:3333/stories",
      })

  
  }
}

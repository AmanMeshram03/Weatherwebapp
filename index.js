import express from "express";
import bodyParser  from "body-parser";
import axios from  "axios";
 //Creating a port
const app = express();
const port =5000;
//Your API Key from the Openweathermap
const APIKey="5176930e456291077a02c2c5276f0333"

//Using Middleware 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", async (req,res)=>{
    // const city= req.body["cityname"];
    try{
 const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${APIKey}`);
 const result = response.data;
 console.log(result);

res.render("index.ejs",{
     data:result
  });
 }
catch(error){
    console.error(error.message);
    res.render("index.ejs",{error:error.message});
}
});

app.post("/",async(req,res)=>{
     
    const city= req.body["cityname"];
    
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const result = response.data;
        console.log(result);
        const temp= result.main.temp;
        let descript= result.weather[0].description;
        const winds= result.wind.speed;
        const humidity= result.main.humidity;
        const cityn= result.name;
        const feelslike=result.main.feels_like;
        var image =req.body["img"];
        var notfound =req.body["img"];
 
      
       

      // Images satisfying the cases
        switch (result.weather[0].description) {
            case 'Clear':
                image="Images/clear-sky.png";
                break;

            case 'moderate rain':
                    image="Images/rainy-day.png";
                break;
            case 'light rain':
                    image="Images/rainy-day.png";
                break;    

             case ' heavy intensity rain':
                    image="Images/rainy-day.png";
                break; 

            case 'Snow':
                    image="Images/snowfall.png";
                    break;
            
            case 'few clouds':
                        image='Images/clouds.png';
                        break;

            case 'mist':
                 image="Images/mist.png";
                    break;

            case 'haze':
                        image="Images/fog.png";
                           break;       
            case 'broken clouds':
                            image="Images/cloudy.png";
                           break;

            case 'overcast clouds':
                            image="Images/clouds.png";
                           break;               
            
            case 'scattered clouds':
                            image="Images/scattered.png";
                           break;                          
            default:
                image="Images/sun.png"
                break;
        }
        
       
 res.render("index.ejs",{
    temper :temp,
     description:descript,
    wind:winds,
    humidityinfo:humidity,
     city:cityn,
     feels:feelslike,
     img:image,

 });
    }
    catch(error){
        
            const notfound="Images/no-results.png";
        
        console.error("Failed to make request:",error.message);
        res.render("index.ejs",{notf:notfound});
    }
});

app.listen(port, ()=>{
    console.log(`Server listening on the port:${port}`);
});
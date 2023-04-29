
import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";

import questions,{answers} from "../database/data.js"
//import resultSchema from "../models/resultSchema.js";
import nodemailer from 'nodemailer';
import mailgen  from 'mailgen';
import Mailgen from "mailgen";

import UserSchema from "../models/userSchema.js";
/** questions controllers  */

// get all questions 
export async function getQuestions(req,res){
   try {
    const q=await Questions.find()
    res.json(q);
   } catch (error) {
    res.json({error});
   }
}

// insert all question 
export async function insertQuestions(req,res){
    try {
        Questions.insertMany({questions,
        answers,
        })
        res.json({msg :"data saved successfully "})
    } catch (error) {
        res.json({error})
    }
}
//delete all questions
export async function  dropQuestions(req,res){
    
    try {
        await Questions.deleteMany();
        res.json("sare questions delete kar diye hai ... ");
    } catch (error) {
        res.json({error})
    }



}


/** result controllers */


/** get all result  */

export async function getResult(req,res){
  try {
    const r=await Results.find()
    res.json(r);
  } catch (error) {
    res.json({error});
  }
}

/** post all result  */

export async function storeResult(req,res){
    const prf=req.body.result;
    const rr="Passed";
    if(prf<25){ rr="Failed"}
   
    
  try {
         
            const {username,result,attempts,points,achived } =req.body;
    let config={
      service:'gmail',
      auth:{
        user:'20bit002@ietdavv.edu.in',
        pass:'adppynyxraafprak'
      }
    }

    let transporter=nodemailer.createTransport(config);


   let MailGenerator= new Mailgen({
     theme:"cerberus",
     product:{
      name:"Mailgen",
      link:"https://mailgen.js/"
     }


   })
  let response={
    body:{
      intro:"TEST RESULTS ",
      table:{
         data:[{
          MailId:username,
          TotalPoint:result.length*10,
          Score:points,
          Attempts :attempts,
         
          Result:achived,

         },
        
        ]

      }
    }
    ,
    outro:" GIVE MORE QUIZS  "
  }


  let mail=MailGenerator.generate(response);
  let message={
    from:'20bit002@ietdavv.edu.in',
    to:username,
    subject:"TEST SCORE ",
    html:mail,

  }
  transporter.sendMail(message);









      //  const {username,result,attempts,points,achived } =req.body;
       if (!username && !result){
        // throw new Error('Data Not Provided.....');
        return res.send("Data Not provided fill");
       }

       //----------- 
 Results.create({ username, result, attempts, points, achived });
       
// Results.findOneAndUpdate(
//     { username: username },
//     {
//       $set: { 
//         result: rr,
//         attempts: attempts,
//         points: points,
//         achived: achived
//       }
//     },
//     { new: true, upsert: true }
//   )
//     .then(updatedResult => {
//       console.log('Result updated:', updatedResult);
//       // handle the case where the result was updated successfully
//     })
//     .catch(err => {
//       console.error(err);
//       // handle any errors that occur
//     });
       
       
       //Results.create({username,result,attempts,points,achived })
       res.json({msg:"uuhuu !! result save ho gya ..🤞🤞. "});


    } catch (error) {
        res.json({error})
    }


}

/** delete  all result  */
export async function dropResult(req,res){
    try {
        await Results.deleteMany();
        res.json({msg:"kar diya dada result delete "})
    } catch (error) {
        res.json({error});
    }
}


////----------
export async function getUserResult(req,res){
  try {
    const { username, result, attempts, points, achived } = req.body;
   if(!username && !result) throw new Error('Data Not Provided...!');

   const r= await Results.findOne({ username});

     res.json({data:r});
     //res.json(r);

} catch (error) {
    res.json({error})
}
}

 


//-------------------------

/** 
 * 
 *  
 * 
 *  let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    }); 
    
    let msg={
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Result score", // Subject line
      text: "Hello wcsbdjorld?", // plain text body
      html: "<b>{Hello worbdsld?</b>", // html body
    }
  

    transporter .sendMail(msg).then((info)=>{
     return res.status(201).json({msg:"you should recive an email",

    info:info.messageId,
    preview:nodemailer.getTestMessageUrl(info)
    
    })
    }).catch(error=>{
      return res.status(500).json({error});
    })

 */


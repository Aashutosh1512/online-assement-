import Questions from '../models/question.model.js';
import Results from '../models/result.model.js';

//import resultSchema from "../models/resultSchema.js";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

/** questions controllers  */

// get all questions
export async function getQuestions(req, res) {
  const subject = req.query.subject;
  const difficulty = req.query.difficulty;

  try {
    let questions = [];

    if (!subject && !difficulty) {
      questions = await Questions.find();
    } else if (subject && !difficulty) {
      questions = await Questions.find({ subject });
    } else if (!subject && difficulty) {
      questions = await Questions.find({ difficulty });
    } else {
      questions = await Questions.find({ difficulty, subject });
    }

    res.json(questions);
  } catch (error) {
    res.json({ error });
  }
}

// insert all question
export async function insertQuestions(req, res) {
  const { questions } = req.body;

  // console.log(res.body);

  try {
    Questions.insertMany(questions);
    res.json({ msg: 'data saved successfully ' });
  } catch (error) {
    res.json({ error });
  }
}

//delete all questions
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json('sare questions delete kar diye hai ... ');
  } catch (error) {
    res.json({ error });
  }
}

/** result controllers */

/** get all result  */

export async function getResult(req, res) {
  try {
    const results = await Results.find();
    res.json(results);
  } catch (error) {
    res.json({ error });
  }
}

/** post all result  */
export async function storeResult(req, res) {
  try {
    const { user, questionsAttempted, points, achived, totalPoints } = req.body;

    let config = {
      service: 'gmail',
      auth: {
        user: '20bit002@ietdavv.edu.in',
        pass: 'adppynyxraafprak',
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: 'cerberus',
      product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/',
      },
    });

    let response = {
      body: {
        intro: 'TEST RESULTS',
        table: {
          data: [
            {
              Name: user.name,
              MailId: user.email,
              TotalPoint: totalPoints,
              Score: points,
              Attempts: questionsAttempted,
              Result: achived,
            },
          ],
        },
      },
      outro: ' GIVE MORE QUIZS',
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: '20bit002@ietdavv.edu.in',
      to: user.email,
      subject: 'TEST SCORE ',
      html: mail,
    };

    transporter.sendMail(message);

    Results.create({ user, questionsAttempted, points, achived, totalPoints });

    res.json({ msg: 'uuhuu !! result save ho gya ..🤞🤞. ' });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

/** delete  all result  */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: 'kar diya dada result delete ' });
  } catch (error) {
    res.json({ error });
  }
}

export async function getUserResult(req, res) {
  try {
    const { email } = req.params;

    if (!email) throw new Error('Email not provided...!');

    const results = await Results.findOne({ email });

    res.json({ data: results });
  } catch (error) {
    res.json({ error });
  }
}

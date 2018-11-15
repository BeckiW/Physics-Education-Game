import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt"
import uuid from "uuid-v4"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

mongoose.connect("mongodb://localhost/physics-game-api")

mongoose.Promise = Promise

mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))


//Check Authentication
function checkAuth(req, res, validFunc) {
  let accessToken = req.query.token || null;

  if (accessToken == null) {
    return res.status(200).json({ error: "Method requires user token" });
  }

  User.findOne({ accessToken: accessToken })
    .then(user => {
      if (user) {
        validFunc(user);
      } else {
        res.send("No user found with that token")
      }
    })
    .catch(err => {
      res.json(err)
    })
}

///////MODELS ///////

///user model and login setup

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})



// endpoint to get info from db (if user is authenticaed)
// app.post("/users/:id/admin", (req, res) => {
// })

//Tests endpoints

const Topic = mongoose.model("Topic", {
  title: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
})

Topic.createCollection()


//Results endpoints

const Result = mongoose.model("Result", {

  user_id: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  topic_id: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

Result.createCollection()

//Results endpoints

const Question = mongoose.model("Question", {

  topic_id: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

Question.createCollection()

//////ENDPOINTS//////

// POST new user to user db
app.post("/users", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  })
  newUser.save()
    .then(() => {
      res.status(201).json({ created: true })
    })
    .catch(err => {
      res.status(400).json({ created: false, error: err })
    })
})

// POST new session (i.e. log in) to user db
app.post("/sessions", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ id: user.id, accessToken: user.accessToken })
      } else {
        res.send("Username or password not found")
      }
    })
    .catch(err => {
      res.json(err)
    })
})


//POST results

app.post("/results", (req, res) => {

  checkAuth(req, res, (user) => {
    const newResult = new Result({


    })
  })

})

//GET topics

app.get("/topics/", (req, res) => {
  Topic.find(). then(topics => {
    console.log("topics: ", topics)
    res.json(topics)
  })
})

//GET questions

app.get("/topics/:id", (req, res) => {
  let topic_id = req.query.topic_id;
  let difficulty = req.query.difficulty
  let sortBy = req.query.sortBy
  let limit = req.query.limit

    if (limit === undefined) {
      limit = 10;
    }

    if (sortBy === undefined) {
      sortBy = "difficulty"
    }

    let dbQuery = Question.find()

      if (topic_id !== undefined) {
        dbQuery.where('topic_id').regex(new RegExp(topic_id, "i"))
      }

    dbQuery.then(questions => {

    let result = questions;
    result = result.slice(0, limit);
    let jsonResult = JSON.stringify(result, null, 4);

    res.setHeader('content-type', 'application/json');
    res.send(jsonResult);
  });
})




// POST single question to db
app.post("/question", (req, res) => {
  const question = new question(req.body)
  question.save()
    .then(() => { res.status(201).send("question added") })
    .catch(err => { res.status(400).send(err) })
})




app.listen(8080, () => console.log("Physics Game API listening on port 8080!"))

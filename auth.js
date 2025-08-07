//sets up Passport with a local authentication strategy, using a Person model for username and password.
const Person=require('./models/Person')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy



passport.use(new LocalStrategy(async(username, password, done) => {
  try {
    const user = await Person.findOne({ username: username })
    if (!user)
      return done(null, false, { message: 'Incorrect username.' })

    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Incorrect password.' })
    }
  } catch (err) {
    return done(err)
  }
}))


module.exports=passport //Export configured passport.
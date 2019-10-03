// ============================== USER CLASS ===========================================

// const Query = require('./src/Query');

// ============== CREATE ===============

// const test = new Query("users")
//     .create({ user_name: "Olfertine", pass: "1234" })
//     .execute()
//     .then(response => console.log(response));

// ============== FIND (SELECT) ===============

// const test = new Query("users")
//     .find({ user_name: "Steffen"})
//     .execute()
//     .then(response => console.log(response));

// const test = new Query("users")
//     .findOne({ user_name: "SteffenLA"})
//     .execute()
//     .then(response => console.log(response));

// const test = new Query("users")
//     .findById('8')
//     .execute()
//     .then(response => console.log(response));

// ============== UPDATE ===============

// const test = new Query("users")
//     .findAndUpdate({id: 8}, { user_name: "Steffen", pass: "879654"})
//     .execute()
//     .then(response => console.log(response));

// const test = new Query("users")
//     .findOneAndUpdate({user_name: "SteffenLA"}, { pass: "testof1234klassebanan"})
//     .execute()
//     .then(response => console.log(response));

// const test = new Query("users")
//     .findByIdAndUpdate(8, { user_name: "SteffenLA", pass: "kase879654"})
//     .execute()
//     .then(response => console.log(response));

// ============== DELETE ===============

// const test = new Query("users")
//     .findAndDelete({fk_role: 4})
//     .execute()
//     .then(response => console.log(response));

// const test = new Query("users")
//     .findOneAndDelete({fk_role: 4})
//     .execute()
//     .then(response => console.log(response));

// const test = new Query("users")
//     .findByIdAndDelete(8)
//     .execute()
//     .then(response => console.log(response));

// ============================== USER CLASS ===========================================

const User = require('./src/User');

// ============== CREATE ===============

// const test = new User({
//     user_name: "Anne",
//     pass: "dfglkmergtjl"
// }).save()
// .then(response => console.log(response));

// ============== VALID PASSWORD ===============

// const test = new User()
//     .find({ user_name: "Anne" })
//     .hasValidPassword("dfglkmergtjl")
//     .then(response => console.log(response));

// ============== UPDATE ===============

// const test = new User()
//     .findAndUpdate({id: 10}, { user_name: "Steffen", pass: "879654"})
//     .execute()
//     .then(response => console.log(response));

// const test = new User()
//     .findOneAndUpdate({user_name: "SteffenLA"}, { pass: "testof1234klassebanan"})
//     .execute()
//     .then(response => console.log(response));

const test = new User()
    .findByIdAndUpdate(18, { user_name: "Franz", pass: "kase879654"})
    .execute()
    .then(response => console.log(response));
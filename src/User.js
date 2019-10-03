const Query = require('./Query');
const bcrypt = require('bcryptjs');
const { extrapolate, encryptPassword } = require('../helper');

class User extends Query {
    constructor(data) {
        super();
        this.table = "users";
        if (data) {
            if (data.hasOwnProperty("pass")) {
                data.pass = encryptPassword(data.pass);
            }
            this.data = data;
        }
    }

    async hasValidPassword(pass) {
        const user = await this.execute();
        return bcrypt.compareSync(pass, user[0].pass); 
    }

    findAndUpdate(criteria, data) {
        if (data.hasOwnProperty("pass")) {
            data.pass = encryptPassword(data.pass);
        }
        const setData = extrapolate(data);
        const setCriteria = extrapolate(criteria);
        this.SQL = `UPDATE ${this.table} SET ${setData.keys.join(', ')} WHERE ${setCriteria.keys.join(' AND ')}`;
        this.values = [...setData.values, ...setCriteria.values]; // ... Spreadoperators
        return this;
    }

    findOneAndUpdate(criteria, data) {
        if (data.hasOwnProperty("pass")) {
            data.pass = encryptPassword(data.pass);
        }
        const setData = extrapolate(data);
        const setCriteria = extrapolate(criteria);
        this.SQL = `UPDATE ${this.table} SET ${setData.keys.join(', ')} WHERE ${setCriteria.keys.join(' AND ')} LIMIT 1`;
        this.values = [...setData.values, ...setCriteria.values]; 
        return this;
    }

    findByIdAndUpdate(id, data) {
        if (data.hasOwnProperty("pass")) {
            data.pass = encryptPassword(data.pass);
        }
        const { keys, values } = extrapolate(data);
        this.SQL = `UPDATE ${this.table} SET ${keys.join(', ')} WHERE id = ${id}`;
        this.values = values
        return this;
    }

    save() {
        const user = this.create(this.data).execute();
        return user;
    }

}

module.exports = User;